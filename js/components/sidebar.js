// js/sidebar.js
document.addEventListener('DOMContentLoaded', () => {
    const chatBtn = document.getElementById('btn-chat');
    const imageBtn = document.getElementById('btn-image-gen');
    const voiceBtn = document.getElementById('btn-voice');
    const mainScreen = document.getElementById('main-screen');

    // Handle View Switching
    const switchView = (viewName) => {
        // Dispatch a custom event so other modules know the view changed
        const event = new CustomEvent('viewChanged', { detail: { view: viewName } });
        document.dispatchEvent(event);
    };

    chatBtn.addEventListener('click', () => switchView('chat'));
    imageBtn.addEventListener('click', () => switchView('image'));
    voiceBtn.addEventListener('click', () => switchView('voice'));
});
