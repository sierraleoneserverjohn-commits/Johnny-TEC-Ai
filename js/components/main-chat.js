// js/main-screen.js
document.addEventListener('DOMContentLoaded', () => {
    const mainScreen = document.getElementById('main-screen');

    // Listen for navigation changes from the sidebar
    document.addEventListener('viewChanged', (e) => {
        const view = e.detail.view;
        
        if (view === 'chat') {
            mainScreen.innerHTML = `<h1>AI Chat</h1><div id="chat-history"></div>`;
            // Trigger chat initialization here
        } else if (view === 'image') {
            mainScreen.innerHTML = `<h1>Image Generator</h1><div id="image-canvas"></div>`;
            // Trigger image generator initialization here
        } else if (view === 'voice') {
            mainScreen.innerHTML = `<h1>Voice Assistant</h1><button id="start-voice">Start Listening</button>`;
            // Trigger voice API initialization here
        }
    });

    // Load default view
    const initEvent = new CustomEvent('viewChanged', { detail: { view: 'chat' } });
    document.dispatchEvent(initEvent);
});
