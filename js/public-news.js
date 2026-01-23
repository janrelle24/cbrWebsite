console.log(" Public news script loaded");

let allNews = [];

document.addEventListener("DOMContentLoaded", loadPublicNews);

async function loadPublicNews() {
    try{
        const res = await fetch("http://localhost:3000/api/public/news");
        const news = await res.json();

        allNews = news;
        renderNews(allNews);
        //add search functionality
        const searchNews = document.getElementById("searchNews");
        searchNews.addEventListener("input", function(){
            const query = this.value.toLowerCase();
            const filtered = allNews.filter(item =>
                item.title.toLowerCase().includes(query) /*||
                item.content.toLowerCase().includes(query)*/
            );
            renderNews(filtered);
        });

    }catch(error){
        console.error("Failed to load public news", error);
        document.getElementById("newsList").innerHTML = "<p>Failed to load news.</p>";
    }
}

function renderNews(news){
    const container = document.getElementById("newsList");
    container.innerHTML = "";

    if (news.length === 0) {
        container.innerHTML = "<p>No news found.</p>";
        return;
    }
    news.forEach(item => {
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

function viewNews(id) {
    window.location.href = `news-view.html?id=${id}`;
}