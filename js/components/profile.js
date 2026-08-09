export function initProfilePanel() {
    const profilePanel = document.getElementById('right-profile-panel');
    const profileIconBtn = document.getElementById('profile-icon-btn'); // You'll add this ID to the avatar

    if(profileIconBtn) {
        profileIconBtn.addEventListener('click', () => {
            profilePanel.classList.toggle('active');
        });
    }
}

