console.log(" Public ordinance script loaded");

let allOrdinance = [];

document.addEventListener("DOMContentLoaded", loadPublicOrdinance);

async function loadPublicOrdinance(){
    try{
        const res = await fetch("http://localhost:3000/api/public/ordinance");
        const ordinance = await res.json();

        allOrdinance = ordinance;
        renderOrdinance(allOrdinance);
        //add search functionality
        const searchOrdinance = document.getElementById("searchOrdinance");
        searchOrdinance.addEventListener("input", function(){
            const query = this.value.toLowerCase();
            const filtered = allOrdinance.filter(item =>
                item.title.toLowerCase().includes(query) 
            );
            renderOrdinance(filtered);
        });

    }catch(error){
        console.error("Failed to load public ordinance", error);
    }
}

function renderOrdinance(ordinance){
    const container = document.getElementById("ordinanceList");
    container.innerHTML = "";

    if(ordinance.length === 0){
        container.innerHTML = "<p>No ordinance found.</p>";
        return;
    }
    ordinance.forEach(item => {
        container.innerHTML += `
            <div class="ordinance-card">
                <h3>${item.title}</h3>
                <p>${new Date(item.createdAt).toLocaleDateString()}</p>
                <p>${item.content.substring(0, 250)}...</p>
                <button onclick="viewOrdinance('${item._id}')">
                    View Full
                </button>
            </div>
        `;
    });
}

function viewOrdinance(id) {
    window.location.href = `ordinance-view.html?id=${id}`;
}