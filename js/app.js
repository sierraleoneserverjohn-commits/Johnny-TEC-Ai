// ==========================================
// JOHNNY TEC DEV - MASTER CONTROLLER
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Sidebar Drawer
    initSidebar();

    // 2. Initialize Search Bar, File Upload (+), and Voice STT API
    initChatBar();

    // 3. Render Initial Screen Content
    loadView('ai-chat');
});

// ------------------------------------------
// 1. SIDEBAR & MENU TOGGLE LOGIC
// ------------------------------------------
function initSidebar() {
    const sidebar = document.getElementById('left-sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    const toggleBtn = document.getElementById('btn-toggle-sidebar');
    const navItems = document.querySelectorAll('.nav-item');
    const btnNewChat = document.getElementById('btn-new-chat');

    function openSidebar() {
        if (sidebar) sidebar.classList.add('open');
        if (overlay) overlay.classList.add('active');
    }

    function closeSidebar() {
        if (sidebar) sidebar.classList.remove('open');
        if (overlay) overlay.classList.remove('active');
    }

    // Hamburger Menu Button Listener
    if (toggleBtn) {
        toggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (sidebar && sidebar.classList.contains('open')) {
                closeSidebar();
            } else {
                openSidebar();
            }
        });
    }

    if (overlay) {
        overlay.addEventListener('click', closeSidebar);
    }

    // Nav Item Click Handler
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            const viewTarget = item.getAttribute('data-view');
            if (viewTarget) loadView(viewTarget);

            closeSidebar();
        });
    });

    if (btnNewChat) {
        btnNewChat.addEventListener('click', () => {
            loadView('ai-chat');
            closeSidebar();
        });
    }
}

// ------------------------------------------
// 2. CONTENT ROUTER (SETTINGS & SCREENS)
// ------------------------------------------
function loadView(viewName) {
    const container = document.getElementById('view-container');
    if (!container) return;

    container.innerHTML = ''; // Clear existing content

    switch (viewName) {
        case 'ai-chat':
            renderAIChat(container);
            break;
        case 'dashboard':
            renderDashboard(container);
            break;
        case 'code-assistant':
            renderCodeAssistant(container);
            break;
        case 'image-generator':
            renderImageGenerator(container);
            break;
        case 'documents':
            renderDocuments(container);
            break;
        case 'knowledge-base':
            renderKnowledgeBase(container);
            break;
        case 'voice-assistant':
            renderVoiceAssistant(container);
            break;
        case 'history':
            renderHistory(container);
            break;
        default:
            renderAIChat(container);
            break;
    }
}

// ------------------------------------------
// 3. ISOLATED CONTENT MODULES
// ------------------------------------------
function renderAIChat(container) {
    container.innerHTML = `
        <section class="greeting-section">
            <h1>👋 Hey <span class="text-blue">Johnny,</span></h1>
            <p class="subtitle">Your AI assistant is ready to help you with anything you need.</p>
        </section>

        <div class="chat-cards-grid">
            <div class="action-card" onclick="alert('Opening Code Assistant...')">
                <div class="card-icon-box">&lt;/&gt;</div>
                <h3>Code</h3>
                <p>Generate code</p>
            </div>
            <div class="action-card" onclick="alert('Opening Explain Tool...')">
                <div class="card-icon-box">≡</div>
                <h3>Explain</h3>
                <p>Explain anything</p>
            </div>
            <div class="action-card" onclick="alert('Opening Content Creator...')">
                <div class="card-icon-box">✏️</div>
                <h3>Create</h3>
                <p>Create content</p>
            </div>
            <div class="action-card" onclick="alert('Opening Problem Solver...')">
                <div class="card-icon-box">⟡</div>
                <h3>Solve</h3>
                <p>Solve problems</p>
            </div>
        </div>
    `;
}

function renderDashboard(container) {
    container.innerHTML = `
        <div style="padding: 1rem 0;">
            <h2>🏠 Dashboard Overview</h2>
            <p style="color:var(--text-muted); margin-top:0.5rem;">Welcome back! Here is your usage overview and active models.</p>
        </div>
    `;
}

function renderCodeAssistant(container) {
    container.innerHTML = `
        <div style="padding: 1rem 0;">
            <h2>&lt;/&gt; Code Assistant</h2>
            <p style="color:var(--text-muted); margin-top:0.5rem;">Write, refactor, and debug code instantly.</p>
        </div>
    `;
}

function renderImageGenerator(container) {
    container.innerHTML = `
        <div style="padding: 1rem 0;">
            <h2>🖼️ Image Generator</h2>
            <p style="color:var(--text-muted); margin-top:0.5rem;">Create high-resolution AI visuals from prompts.</p>
        </div>
    `;
}

function renderDocuments(container) {
    container.innerHTML = `
        <div style="padding: 1rem 0;">
            <h2>📄 Documents</h2>
            <p style="color:var(--text-muted); margin-top:0.5rem;">Manage and analyze your uploaded files.</p>
        </div>
    `;
}

function renderKnowledgeBase(container) {
    container.innerHTML = `
        <div style="padding: 1rem 0;">
            <h2>📖 Knowledge Base</h2>
            <p style="color:var(--text-muted); margin-top:0.5rem;">Your custom data vectors and documents.</p>
        </div>
    `;
}

function renderVoiceAssistant(container) {
    container.innerHTML = `
        <div style="padding: 1rem 0;">
            <h2>🎙️ Voice Assistant</h2>
            <p style="color:var(--text-muted); margin-top:0.5rem;">Real-time interactive voice dialogue.</p>
        </div>
    `;
}

function renderHistory(container) {
    container.innerHTML = `
        <div style="padding: 1rem 0;">
            <h2>🕒 History</h2>
            <p style="color:var(--text-muted); margin-top:0.5rem;">Your previous conversations and sessions.</p>
        </div>
    `;
}

// ------------------------------------------
// 4. BOTTOM BAR: SEARCH, FILE UPLOAD & SPEECH
// ------------------------------------------
function initChatBar() {
    const attachBtn = document.getElementById('btn-attach-file');
    const fileInput = document.getElementById('media-file-input');
    const micBtn = document.getElementById('btn-mic-stt');
    const sendBtn = document.getElementById('btn-send-message');
    const chatInput = document.getElementById('chat-input');

    // (+) File & Video Upload Trigger
    if (attachBtn && fileInput) {
        attachBtn.addEventListener('click', () => fileInput.click());
        fileInput.addEventListener('change', (e) => {
            const files = Array.from(e.target.files);
            if (files.length > 0) {
                alert(`Attached ${files.length} file(s): ${files.map(f => f.name).join(', ')}`);
            }
        });
    }

    // Web Speech API Voice-To-Text
    if (micBtn && chatInput) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (SpeechRecognition) {
            const recognition = new SpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = false;

            micBtn.addEventListener('click', () => {
                if (micBtn.classList.contains('listening')) {
                    recognition.stop();
                } else {
                    recognition.start();
                }
            });

            recognition.onstart = () => {
                micBtn.classList.add('listening');
                chatInput.placeholder = "Listening to your voice...";
            };

            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                chatInput.value = transcript;
            };

            recognition.onerror = () => {
                micBtn.classList.remove('listening');
                chatInput.placeholder = "Type your message...";
            };

            recognition.onend = () => {
                micBtn.classList.remove('listening');
                chatInput.placeholder = "Type your message...";
            };
        } else {
            micBtn.addEventListener('click', () => {
                alert("Speech Recognition API is not supported on this browser.");
            });
        }
    }

    // Send Message Handler
    function handleSend() {
        const msg = chatInput.value.trim();
        if (msg) {
            alert(`Sending message: ${msg}`);
            chatInput.value = '';
        }
    }

    if (sendBtn) sendBtn.addEventListener('click', handleSend);
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSend();
        });
    }
}
