// js/components/main-chat.js

const mainContent = document.getElementById('feature-grid');
const headerText = document.querySelector('header h1');

export function startNewChat() {
    // Instantly wipes the main screen clean
    mainContent.innerHTML = '';
    headerText.innerHTML = 'New Chat Started';
    console.log("UI: Screen cleared. Ready for new input.");
}

export function loadMainAIChat() {
    // Restores the default AI chat view
    headerText.innerHTML = `Hey <span style="background: var(--gradient-brand); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Johnny,</span>`;
    mainContent.innerHTML = `
        <div class="chat-prompt-area">
            <p>Welcome back to the main interface.</p>
        </div>
    `;
    console.log("UI: Main AI Chat loaded.");
}
