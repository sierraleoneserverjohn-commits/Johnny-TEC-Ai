// js/components/settings.js

export function initSettings() {
    // 1. Open/Close Settings Panel (Assuming you add a settings modal/panel)
    const settingsBtn = document.getElementById('menu-settings'); 
    const settingsPanel = document.getElementById('settings-panel');
    
    if (settingsBtn && settingsPanel) {
        settingsBtn.addEventListener('click', () => {
            settingsPanel.classList.toggle('active');
            console.log("UI: Settings panel toggled.");
        });
    }

    // 2. AI Model Selection (Focused on Open-Source APIs)
    const modelSelect = document.getElementById('ai-model-select');
    if (modelSelect) {
        modelSelect.addEventListener('change', (e) => {
            const selectedModel = e.target.value; // e.g., 'mistral-7b', 'llama-3'
            console.log(`Settings: API model switched to ${selectedModel}`);
            
            // Instantly save this preference to your database
            saveSettingToDB('preferred_model', selectedModel);
        });
    }

    // 3. Voice API Toggle (Switching between free Web API and external Realistic Voice API)
    const voiceEngineToggle = document.getElementById('voice-engine-toggle');
    if (voiceEngineToggle) {
        voiceEngineToggle.addEventListener('change', (e) => {
            const useExternalAPI = e.target.checked; 
            console.log(`Settings: External Voice API is ${useExternalAPI ? 'ON' : 'OFF'}`);
            
            saveSettingToDB('use_external_voice', useExternalAPI);
        });
    }

    // 4. API Key Input (If you ever need to securely pass an API key)
    const apiKeyInput = document.getElementById('api-key-input');
    if (apiKeyInput) {
        apiKeyInput.addEventListener('blur', (e) => {
            const keyString = e.target.value;
            if (keyString.length > 0) {
                console.log("Settings: New API Key registered.");
                saveSettingToDB('custom_api_key', keyString);
            }
        });
    }
}

// Helper function to send settings directly to your Python backend
async function saveSettingToDB(settingKey, settingValue) {
    try {
        // Pointing to your local Python server connected to SQLite
        const response = await fetch('http://localhost:5000/api/settings/update', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({ 
                key: settingKey, 
                value: settingValue 
            })
        });
        
        if (response.ok) {
            console.log(`DB: Setting '${settingKey}' saved successfully.`);
        }
    } catch (error) {
        console.error('DB Error: Failed to save setting to the backend.', error);
    }
}

