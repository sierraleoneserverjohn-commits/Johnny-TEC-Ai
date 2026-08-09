export function initChatBar() {
    const attachBtn = document.getElementById('btn-attach-file');
    const fileInput = document.getElementById('media-file-input');
    const micBtn = document.getElementById('btn-mic-stt');
    const sendBtn = document.getElementById('btn-send-message');
    const chatInput = document.getElementById('chat-input');

    // 1. File & Video Upload Trigger (+ Button)
    if (attachBtn && fileInput) {
        attachBtn.addEventListener('click', () => fileInput.click());

        fileInput.addEventListener('change', (e) => {
            const files = Array.from(e.target.files);
            if (files.length > 0) {
                const fileNames = files.map(f => f.name).join(', ');
                alert(`Attached ${files.length} file(s): ${fileNames}`);
            }
        });
    }

    // 2. Mic Voice-to-Text API Implementation
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

            recognition.onerror = (event) => {
                console.error("Speech Recognition Error:", event.error);
                micBtn.classList.remove('listening');
                chatInput.placeholder = "Type your message...";
            };

            recognition.onend = () => {
                micBtn.classList.remove('listening');
                chatInput.placeholder = "Type your message...";
            };
        } else {
            micBtn.addEventListener('click', () => {
                alert("Web Speech API is not supported in this browser.");
            });
        }
    }

    // 3. Send Message Action
    const handleSend = () => {
        const text = chatInput.value.trim();
        if (text) {
            alert(`Sending message: ${text}`);
            chatInput.value = '';
        }
    };

    if (sendBtn) sendBtn.addEventListener('click', handleSend);
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSend();
        });
    }
 }
