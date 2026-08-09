import { renderDashboard } from '../modules/dashboard.js';
import { renderAIChat } from '../modules/ai-chat.js';
import { renderCodeAssistant } from '../modules/code-assistant.js';
import { renderImageGenerator } from '../modules/image-generator.js';
import { renderDocuments } from '../modules/documents.js';
import { renderKnowledgeBase } from '../modules/knowledge-base.js';
import { renderVoiceAssistant } from '../modules/voice-assistant.js';
import { renderHistory } from '../modules/history.js';

export function loadView(viewName) {
    const container = document.getElementById('view-container');
    if (!container) return;

    container.innerHTML = '';

    switch (viewName) {
        case 'dashboard':
            renderDashboard(container);
            break;
        case 'ai-chat':
            renderAIChat(container);
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
