// js/api/history-db.js

// This points to your Python Flask/FastAPI server running your SQLite DB
const DB_BACKEND_URL = "http://localhost:5000/api/history";

export async function saveChatToDB(message, reply) {
    try {
        await fetch(`${DB_BACKEND_URL}/save`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_msg: message, ai_reply: reply })
        });
        console.log("DB: Conversation saved to SQLite.");
    } catch (error) {
        console.error("DB Error: Could not save chat.", error);
    }
}

export async function openHistoryPanel() {
    try {
        console.log("DB: Fetching history from Python backend...");
        const response = await fetch(`${DB_BACKEND_URL}/load`);
        const historyData = await response.json();
        
        // Render the history data to the UI
        console.log("DB: History loaded successfully.", historyData);
        return historyData;
    } catch (error) {
        console.error("DB Error: Could not load history.", error);
    }
}

