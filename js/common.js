// common.js — loads partials into placeholders and marks active nav link
async function loadPartial(selector, url){
    const el = document.querySelector(selector);
    if(!el) return;
    try{
        const res = await fetch(url);
        if(!res.ok) throw new Error(`Failed to load ${url}: ${res.status}`);
        el.innerHTML = await res.text();
    } catch(err){
        console.error('Error loading partial:', url, err);
    }
}

async function loadLayout(){
    await Promise.all([
        loadPartial('#header-placeholder', 'partials/header.html'),
        loadPartial('#nav-placeholder', 'partials/nav.html'),
        loadPartial('#footer-placeholder', 'partials/footer.html'),
    ]);

    //Once nav is loaded, safely initialize sidebar toggle
    initSidebarMenu();

    //highlight active nav link
    const path = location.pathname.split('/').pop() || 'index.html';
    const name = path.split('.')[0];
    const navLink = document.querySelector(`.nav-link[data-nav="${name}"]`);
    if (navLink) navLink.classList.add('active');
}

function initSidebarMenu() {
    const sidebar = document.getElementById("sidebar");
    const hamburger = document.getElementById("hamburger-btn");
    const overlay = document.getElementById("overlay");

    // Only attach listeners if elements exist
    if (!sidebar || !hamburger || !overlay) {
        console.warn("Sidebar elements not found. Skipping toggle initialization.");
        return;
    }

    // Toggle sidebar open/close
    hamburger.addEventListener("click", () => {
        sidebar.classList.toggle("active");
        overlay.classList.toggle("active");
    });

    // Hide sidebar when overlay is clicked
    overlay.addEventListener("click", () => {
        sidebar.classList.remove("active");
        overlay.classList.remove("active");
    });
}

document.addEventListener('DOMContentLoaded', loadLayout);
