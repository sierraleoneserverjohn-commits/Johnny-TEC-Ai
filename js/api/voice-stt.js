// js/api/voice.js

export function startLiveVoiceMode() {
    console.log("VOICE: Activating live conversation mode...");
    
    // 1. Listen to the user (Speech to Text)
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.onstart = () => {
        console.log("VOICE: Microphone hot. Listening...");
        // Here you would trigger your web audio visualizer animation
    };

    recognition.onresult = (event) => {
        const userSpoke = event.results[0][0].transcript;
        console.log("VOICE: You said: ", userSpoke);
        
        // Pass to the AI text engine, then speak the reply
        // (Assuming import of generateAIResponse here in the master app)
    };

    recognition.start();
}

export function speakText(text) {
    // 2. Speak the AI reply (Text to Speech)
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Pick a smooth, natural English voice
    const voices = synth.getVoices();
    utterance.voice = voices.find(voice => voice.lang === 'en-US') || voices[0];
    utterance.rate = 1.0; 
    
    console.log("VOICE: AI is speaking...");
    synth.speak(utterance);
}

