console.log(" Public news script loaded");

let allNews = [];
let filtered = [];
let currentPage = 1;
const ITEMS_PER_PAGE = 5;

document.addEventListener("DOMContentLoaded", loadPublicNews);

async function loadPublicNews() {
    try{
        const res = await fetch("http://localhost:3000/api/public/news");
        const news = await res.json();

        allNews = news;
        filtered = news;
        renderNews();
        updatePaginationButtons();

        //add search functionality
        const searchNews = document.getElementById("searchNews");
        searchNews.addEventListener("input", function(){
            const query = this.value.toLowerCase();
            filtered = allNews.filter(item =>
                item.title.toLowerCase().includes(query) 
            );
            currentPage = 1;
            renderNews();
            updatePaginationButtons();
        });
        // PREV / NEXT
        document.getElementById("prevBtn").addEventListener("click", prevPage);
        document.getElementById("nextBtn").addEventListener("click", nextPage);

    }catch(error){
        console.error("Failed to load public news", error);
        document.getElementById("newsList").innerHTML = "<p>Failed to load news.</p>";
    }
}

function renderNews(){
    const container = document.getElementById("newsList");
    container.innerHTML = "";

    if (filtered.length === 0) {
        container.innerHTML = "<p>No news found.</p>";
        return;
    }
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const pageItems = filtered.slice(start, end);

    pageItems.forEach(item => {
        container.innerHTML += `
            <div class="news-card">
                <img src="http://localhost:3000${item.image}" class="news-image" alt="${item.title}">
                <div class="news-content">
                    <h3>${item.title}</h3>
                    <p class="news-date">
                        ${new Date(item.createdAt).toLocaleDateString()}
                    </p>
                    <p>
                        ${item.content.substring(0, 250)}...
                    </p>
                    <button onclick="viewNews('${item._id}')">
                        View Full
                    </button>
                </div>
            </div>
        `;
    });
}
// Pagination controls 
function prevPage(){
    if(currentPage > 1){
        currentPage--;
        renderNews();
        updatePaginationButtons();
    }
}

function nextPage(){
    const maxPage = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    if(currentPage < maxPage){
        currentPage++;
        renderNews();
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
//view news details
function viewNews(id) {
    window.location.href = `news-view.html?id=${id}`;
}