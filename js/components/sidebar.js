// js/components/sidebar.js

export function initSidebar() {
    const sidebar = document.getElementById('left-sidebar');
    const menuBtn = document.getElementById('mobile-menu-btn');

    // 1. Mobile Menu Toggle Logic
    // We use an 'if' statement so if the main screen breaks, this doesn't crash the app.
    if (sidebar && menuBtn) {
        menuBtn.addEventListener('click', () => {
            sidebar.classList.toggle('active');
            console.log("Sidebar toggled");
        });
    }

    // 2. Sidebar Navigation Routing
    const btnNewChat = document.getElementById('btn-new-chat');
    if (btnNewChat) {
        btnNewChat.addEventListener('click', () => {
            // Logic to clear screen goes here
            // If main screen is missing, we can safely close the sidebar anyway
            if (sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
            }
        });
    }

    // You would repeat the safe click listeners for the other sidebar buttons here
}
