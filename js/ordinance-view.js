console.log("Ordinance view script loaded");

document.addEventListener("DOMContentLoaded", async function(){
    const params = new URLSearchParams(window.location.search);
    const ordinanceId = params.get("id");

    if(!ordinanceId){
        document.getElementById("viewContainer").innerHTML = "<p>No ordinance ID provided.</p>";
        return;
    }

    try{
        const res = await fetch(`${API_BASE}/api/public/ordinance/${ordinanceId}`);
        if(!res.ok) throw new Error("Failed to fetch ordinance details");
        const ordinance = await res.json();

        if (!ordinance) {
            document.getElementById("ordinanceContainer").innerHTML = "<p>Ordinance not found.</p>";
            return;
        }
        // Render full ordinance content
        document.getElementById("ordinanceContainer").innerHTML = `
            <div class="view-item">
                <div class="view-title">${ordinance.title}</div>
                <p class="view-date"><i>${new Date(ordinance.date).toLocaleDateString()}</i></p>
                <div class="view-content">${ordinance.content}</div>
            </div>
        `;

    }catch(error){
        console.error("Failed to load ordinance:", error);
        document.getElementById("ordinanceContainer").innerHTML = "<p>Failed to load ordinance details.</p>";
    }
});