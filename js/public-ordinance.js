console.log(" Public ordinance script loaded");

let allOrdinance = [];
let filtered = [];
let currentPage = 1;
const ITEMS_PER_PAGE = 5;

document.addEventListener("DOMContentLoaded", loadPublicOrdinance);

async function loadPublicOrdinance(){
    try{
        const res = await fetch(`${API_BASE}/api/public/ordinance`);
        if(!res.ok) throw new Error("Failed to fetch public ordinance");
        const ordinance = await res.json();

        allOrdinance = ordinance;
        filtered = ordinance;
        renderOrdinance();
        updatePaginationButtons();

        //add search functionality
        const searchOrdinance = document.getElementById("searchOrdinance");
        searchOrdinance.addEventListener("input", function(){
            const query = this.value.toLowerCase();
            filtered = allOrdinance.filter(item =>
                item.title.toLowerCase().includes(query) 
            );
            currentPage = 1;
            renderOrdinance();
            updatePaginationButtons();
        });
        // PREV / NEXT
        document.getElementById("prevBtn").addEventListener("click", prevPage);
        document.getElementById("nextBtn").addEventListener("click", nextPage);

    }catch(error){
        console.error("Failed to load public ordinance", error);
    }
}

function renderOrdinance(){
    const container = document.getElementById("ordinanceList");
    container.innerHTML = "";

    if(filtered.length === 0){
        container.innerHTML = "<p>No ordinance found.</p>";
        return;
    }
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const pageItems = filtered.slice(start, end);

    pageItems.forEach(item => {
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
// Pagination controls 
function prevPage(){
    if(currentPage > 1){
        currentPage--;
        renderOrdinance();
        updatePaginationButtons();
    }
}

function nextPage(){
    const maxPage = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    if(currentPage < maxPage){
        currentPage++;
        renderOrdinance();
        updatePaginationButtons();
    }
}
// Enable / Disable buttons 
function updatePaginationButtons(){
    const maxPage = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    document.getElementById("prevBtn").disabled = currentPage === 1;
    document.getElementById("nextBtn").disabled = currentPage === maxPage;

    //page number indicator
    document.getElementById("pageIndicator").textContent = `Page ${currentPage} of ${maxPage || 1}`;
}
//view ordinance details
function viewOrdinance(id) {
    window.location.href = `ordinance-view.html?id=${id}`;
}