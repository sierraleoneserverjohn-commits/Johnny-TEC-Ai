export function initSidebar() {
    const sidebar = document.getElementById('left-sidebar');
    const toggleBtn = document.getElementById('toggle-sidebar-btn');

    toggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });
}

