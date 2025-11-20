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

    //highlight active nav link
    const path = location.pathname.split('/').pop() || 'index.html';
    const name = path.split('.')[0];
    const navLink = document.querySelector(`.nav-link[data-nav="${name}"]`);
    if (navLink) navLink.classList.add('active');
}

document.addEventListener('DOMContentLoaded', loadLayout);
