// js/app.js

// Import all your strictly isolated modules
import { initSidebar } from './components/sidebar.js';
import { initSettings } from './components/settings.js';

// Boot up Johnny Tec
document.addEventListener('DOMContentLoaded', () => {
    console.log("Initializing Johnny Tec Ecosystem...");
    
    // Initialize components
    initSidebar();
    initSettings();
    
    console.log("All modules loaded successfully.");
});
