// Import the separate logic files for each feature
import { startNewChat, loadMainAIChat } from './main-chat.js';
import { openImageGenerator } from './image-generator.js';
import { startLiveVoiceMode } from './voice-assistant.js';
import { openHistoryPanel } from './history.js';

export function initSidebar() {
    // 1. New Chat Button
    document.getElementById('btn-new-chat').addEventListener('click', () => {
        startNewChat(); // This function will clear the screen
    });

    // 2. AI Chat Button
    document.getElementById('menu-ai-chat').addEventListener('click', () => {
        loadMainAIChat(); // Brings user back to the main interface
    });

    // 3. Image Generator Button
    document.getElementById('menu-image-gen').addEventListener('click', () => {
        openImageGenerator(); 
    });

    // 4. Voice Assistant Button
    document.getElementById('menu-voice-assist').addEventListener('click', () => {
        startLiveVoiceMode(); // Triggers the microphone and realistic voice
    });

    // 5. History Button
    document.getElementById('menu-history').addEventListener('click', () => {
        openHistoryPanel();
    });
}
