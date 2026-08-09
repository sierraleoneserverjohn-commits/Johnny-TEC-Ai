// js/api/text-llm.js

const API_URL = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2";
// You will plug your free API key in securely later through your Python backend
const API_KEY = "YOUR_FREE_API_KEY"; 

export async function generateAIResponse(userMessage) {
    try {
        console.log("API: Sending message to LLM...");
        
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ inputs: userMessage })
        });

        const data = await response.json();
        return data[0].generated_text;

    } catch (error) {
        console.error("API Error: Text generation failed.", error);
        return "Sorry bro, the AI core is currently offline.";
    }
}

