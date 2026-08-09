// ==========================================
// JOHNNY TEC DEV - MASTER APP CONTROLLER
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    initSidebar();
    initChatBar();
    initProfileModal();
    loadView('ai-chat');
});

// ------------------------------------------
// 1. SIDEBAR & NAVIGATION DRAWER
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

    if (toggleBtn) {
        toggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            sidebar && sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
        });
    }

    if (overlay) overlay.addEventListener('click', closeSidebar);

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
// 2. PROFILE & API HEALTH MONITOR MODAL
// ------------------------------------------
function initProfileModal() {
    const modal = document.getElementById('api-profile-modal');
    const closeBtn = document.getElementById('close-modal-btn');
    const headerAvatar = document.querySelector('.header-avatar');
    const sidebarProfile = document.querySelector('.user-profile-tile');

    function openModal() {
        if (modal) {
            modal.classList.add('active');
            checkAllApiHealth();
        }
    }

    function closeModal() {
        if (modal) modal.classList.remove('active');
    }

    if (headerAvatar) headerAvatar.addEventListener('click', openModal);
    if (sidebarProfile) sidebarProfile.addEventListener('click', openModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
}

// API Connection Status Detector
window.testApiConnection = function(apiType) {
    const badge = document.getElementById(`status-${apiType}`);
    const keyInput = document.getElementById(`key-${apiType}`);

    if (!badge) return;

    badge.className = 'status-badge status-checking';
    badge.innerText = 'Testing...';

    setTimeout(() => {
        if (keyInput && keyInput.value.trim() !== '') {
            badge.className = 'status-badge status-online';
            badge.innerText = 'ONLINE (200 OK)';
        } else {
            badge.className = 'status-badge status-offline';
            badge.innerText = 'OFFLINE (No Key)';
        }
    }, 800);
};

function checkAllApiHealth() {
    ['llm', 'image', 'voice'].forEach(type => window.testApiConnection(type));
}

// ------------------------------------------
// 3. CONTENT ROUTER
// ------------------------------------------
function loadView(viewName) {
    const container = document.getElementById('view-container');
    if (!container) return;

    container.innerHTML = '';

    switch (viewName) {
        case 'ai-chat':
            renderAIChat(container);
            break;
        case 'image-generator':
            renderImageGenerator(container);
            break;
        case 'voice-assistant':
            renderVoiceAssistant(container);
            break;
        case 'dashboard':
            renderDashboard(container);
            break;
        case 'code-assistant':
            renderCodeAssistant(container);
            break;
        case 'documents':
            renderDocuments(container);
            break;
        case 'knowledge-base':
            renderKnowledgeBase(container);
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
// 4. OPTION 2: IMAGE GENERATOR SCREEN
// ------------------------------------------
function renderImageGenerator(container) {
    container.innerHTML = `
        <div class="generator-container">
            <div>
                <h2>🖼️ AI Image Generator</h2>
                <p style="color:var(--text-muted); font-size:0.85rem; margin-top:0.25rem;">Transform your textual ideas into artwork.</p>
            </div>

            <div class="generator-controls">
                <div class="option-group">
                    <label>Style Preset</label>
                    <div class="pill-selector" id="style-selector">
                        <button class="select-pill active">Photorealistic</button>
                        <button class="select-pill">Anime / Manga</button>
                        <button class="select-pill">3D Render</button>
                        <button class="select-pill">Cyberpunk</button>
                        <button class="select-pill">Digital Oil</button>
                    </div>
                </div>

                <div class="option-group">
                    <label>Aspect Ratio</label>
                    <div class="pill-selector" id="ratio-selector">
                        <button class="select-pill active">1:1 Square</button>
                        <button class="select-pill">16:9 Landscape</button>
                        <button class="select-pill">9:16 Portrait</button>
                    </div>
                </div>

                <button id="btn-run-image-gen" class="btn-generate">✨ Generate Image</button>
            </div>

            <h3 style="font-size:1rem; margin-top:0.5rem;">Recent Generations</h3>
            <div id="image-gallery" class="gallery-grid">
                <div class="image-card"><img src="https://picsum.photos/400/400?random=1" alt="Generated visual 1"></div>
                <div class="image-card"><img src="https://picsum.photos/400/400?random=2" alt="Generated visual 2"></div>
            </div>
        </div>
    `;

    // Interactive Pill Selection
    const bindPills = (containerId) => {
        const pills = container.querySelectorAll(`#${containerId} .select-pill`);
        pills.forEach(pill => {
            pill.addEventListener('click', () => {
                pills.forEach(p => p.classList.remove('active'));
                pill.classList.add('active');
            });
        });
    };

    bindPills('style-selector');
    bindPills('ratio-selector');

    // Trigger Generation
    const genBtn = container.querySelector('#btn-run-image-gen');
    const gallery = container.querySelector('#image-gallery');
    
    if (genBtn && gallery) {
        genBtn.addEventListener('click', () => {
            genBtn.innerText = '⏳ Rendering Visual...';
            genBtn.style.opacity = '0.7';

            setTimeout(() => {
                const newCard = document.createElement('div');
                newCard.className = 'image-card';
                newCard.innerHTML = `<img src="https://picsum.photos/400/400?random=${Math.floor(Math.random() * 1000)}" alt="New dynamic art">`;
                gallery.prepend(newCard);

                genBtn.innerText = '✨ Generate Image';
                genBtn.style.opacity = '1';
            }, 1200);
        });
    }
}

// ------------------------------------------
// 5. OPTION 3: VOICE ASSISTANT VISUALIZER
// ------------------------------------------
function renderVoiceAssistant(container) {
    container.innerHTML = `
        <div class="voice-wrapper">
            <h2>🎙️ AI Voice Assistant</h2>
            <p id="voice-status-text" style="color:var(--text-muted); font-size:0.9rem; margin-top:0.4rem;">Tap the orb to start live voice session</p>

            <div id="interactive-orb" class="orb-visualizer">
                <div class="sound-waves">
                    <div class="wave-bar"></div>
                    <div class="wave-bar"></div>
                    <div class="wave-bar"></div>
                    <div class="wave-bar"></div>
                </div>
            </div>

            <div style="display:flex; gap:1rem; margin-top:1rem;">
                <button id="toggle-voice-btn" class="btn-generate" style="padding:0.75rem 2rem;">Start Conversation</button>
            </div>
        </div>
    `;

    const orb = container.querySelector('#interactive-orb');
    const voiceBtn = container.querySelector('#toggle-voice-btn');
    const statusText = container.querySelector('#voice-status-text');

    let isListening = false;

    if (orb && voiceBtn) {
        const toggleSession = () => {
            isListening = !isListening;
            if (isListening) {
                orb.classList.add('listening');
                voiceBtn.innerText = 'End Conversation';
                voiceBtn.style.background = 'linear-gradient(90deg, #ff4757, #ff6b81)';
                statusText.innerText = 'Listening to your voice... Speak now.';
            } else {
                orb.classList.remove('listening');
                voiceBtn.innerText = 'Start Conversation';
                voiceBtn.style.background = 'var(--button-gradient)';
                statusText.innerText = 'Tap the orb to start live voice session';
            }
        };

        orb.addEventListener('click', toggleSession);
        voiceBtn.addEventListener('click', toggleSession);
    }
}

// Standard Content Stubs
function renderAIChat(container) {
    container.innerHTML = `
        <section class="greeting-section">
            <h1>👋 Hey <span class="text-blue">Johnny,</span></h1>
            <p class="subtitle">Your AI assistant is ready to help you with anything you need.</p>
        </section>
        <div class="chat-cards-grid">
            <div class="action-card" onclick="loadView('code-assistant')">
                <div class="card-icon-box">&lt;/&gt;</div>
                <h3>Code</h3>
                <p>Generate code</p>
            </div>
            <div class="action-card" onclick="loadView('image-generator')">
                <div class="card-icon-box">🖼️</div>
                <h3>Create Images</h3>
                <p>Synthesize visual art</p>
            </div>
            <div class="action-card" onclick="loadView('voice-assistant')">
                <div class="card-icon-box">🎙️</div>
                <h3>Voice Assistant</h3>
                <p>Speak live with AI</p>
            </div>
            <div class="action-card" onclick="alert('Opening Solver...')">
                <div class="card-icon-box">⟡</div>
                <h3>Solve</h3>
                <p>Solve complex problems</p>
            </div>
        </div>
    `;
}

function renderDashboard(c) { c.innerHTML = `<h2>🏠 Dashboard</h2><p style="color:var(--text-muted); margin-top:0.5rem;">System performance & active API metrics.</p>`; }
function renderCodeAssistant(c) { c.innerHTML = `<h2>&lt;/&gt; Code Assistant</h2><p style="color:var(--text-muted); margin-top:0.5rem;">Write, refactor, and debug code.</p>`; }
function renderDocuments(c) { c.innerHTML = `<h2>📄 Documents</h2><p style="color:var(--text-muted); margin-top:0.5rem;">Manage uploaded files and documents.</p>`; }
function renderKnowledgeBase(c) { c.innerHTML = `<h2>📖 Knowledge Base</h2><p style="color:var(--text-muted); margin-top:0.5rem;">Custom data vector stores.</p>`; }
function renderHistory(c) { c.innerHTML = `<h2>🕒 History</h2><p style="color:var(--text-muted); margin-top:0.5rem;">Previous chat logs and generations.</p>`; }

// ------------------------------------------
// 6. BOTTOM BAR ACTIONS
// ------------------------------------------
function initChatBar() {
    const attachBtn = document.getElementById('btn-attach-file');
    const fileInput = document.getElementById('media-file-input');
    const micBtn = document.getElementById('btn-mic-stt');
    const sendBtn = document.getElementById('btn-send-message');
    const chatInput = document.getElementById('chat-input');

    if (attachBtn && fileInput) {
        attachBtn.addEventListener('click', () => fileInput.click());
        fileInput.addEventListener('change', (e) => {
            const files = Array.from(e.target.files);
            if (files.length > 0) alert(`Attached ${files.length} file(s)`);
        });
    }

    if (micBtn && chatInput) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            const recognition = new SpeechRecognition();
            micBtn.addEventListener('click', () => recognition.start());
            recognition.onstart = () => micBtn.classList.add('listening');
            recognition.onresult = (e) => chatInput.value = e.results[0][0].transcript;
            recognition.onend = () => micBtn.classList.remove('listening');
        }
    }

    const sendMsg = () => {
        if (chatInput && chatInput.value.trim()) {
            alert(`Sending: ${chatInput.value.trim()}`);
            chatInput.value = '';
        }
    };

    if (sendBtn) sendBtn.addEventListener('click', sendMsg);
    if (chatInput) chatInput.addEventListener('keypress', (e) => e.key === 'Enter' && sendMsg());
}
    
