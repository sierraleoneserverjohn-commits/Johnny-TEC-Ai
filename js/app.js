// Import your individual components
import { initSidebar } from './components/sidebar.js';
import { initProfilePanel } from './components/profile.js';

// Initialize everything when the document loads
document.addEventListener('DOMContentLoaded', () => {
    initSidebar();
    initProfilePanel();
    
    console.log("Johnny Tec UI Initialized successfully.");
});

