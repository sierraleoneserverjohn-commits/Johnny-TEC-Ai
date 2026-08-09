import { loadView } from './content-router.js';

export function initSidebar() {
    const sidebar = document.getElementById('left-sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    const toggleBtn = document.getElementById('btn-toggle-sidebar');
    const navItems = document.querySelectorAll('.nav-item');
    const btnNewChat = document.getElementById('btn-new-chat');

    // Drawer Toggle Logic
    const toggleMenu = () => {
        sidebar.classList.toggle('open');
        overlay.classList.toggle('active');
    };

    if (toggleBtn) toggleBtn.addEventListener('click', toggleMenu);
    if (overlay) overlay.addEventListener('click', toggleMenu);

    // Sidebar View Selector
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            const viewTarget = item.getAttribute('data-view');
            loadView(viewTarget);

            if (window.innerWidth <= 768) {
                toggleMenu();
            }
        });
    });

    if (btnNewChat) {
        btnNewChat.addEventListener('click', () => {
            loadView('ai-chat');
        });
    }
}
