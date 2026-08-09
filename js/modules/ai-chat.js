export function renderAIChat(container) {
    container.innerHTML = `
        <section class="greeting-section">
            <h1>👋 Hey <span class="text-blue">Johnny,</span></h1>
            <p class="subtitle">Your AI assistant is ready to help you with anything you need.</p>
        </section>

        <div class="chat-cards-grid">
            <div class="action-card">
                <div class="card-icon-box">&lt;/&gt;</div>
                <h3>Code</h3>
                <p>Generate code</p>
            </div>
            <div class="action-card">
                <div class="card-icon-box">≡</div>
                <h3>Explain</h3>
                <p>Explain anything</p>
            </div>
            <div class="action-card">
                <div class="card-icon-box">✏️</div>
                <h3>Create</h3>
                <p>Create content</p>
            </div>
            <div class="action-card">
                <div class="card-icon-box">⟡</div>
                <h3>Solve</h3>
                <p>Solve problems</p>
            </div>
        </div>
    `;
}
