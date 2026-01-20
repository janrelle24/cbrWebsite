document.addEventListener("DOMContentLoaded", loadPublicOrdinance);

async function loadPublicOrdinance(){
    try{
        const res = await fetch("http://localhost:3000/api/public/ordinance");
        const ordinance = await res.json();

        const container = document.getElementById("ordinanceList");
        container.innerHTML = "";

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

    }catch(error){
        console.error("Failed to load public ordinance", error);
    }
}