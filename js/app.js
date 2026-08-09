import { initSidebar } from './components/sidebar.js';
import { initChatBar } from './components/chat-bar.js';
import { loadView } from './components/content-router.js';

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Navigation Drawer
    initSidebar();

    // Initialize Search, Attachment +, and Voice-To-Text Mic
    initChatBar();

    // Load initial view (AI Chat)
    loadView('ai-chat');
});
