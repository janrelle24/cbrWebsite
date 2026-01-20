console.log(" Public news script loaded");
document.addEventListener("DOMContentLoaded", loadPublicNews);

async function loadPublicNews() {
    try{
        const res = await fetch("http://localhost:3000/api/public/news");
        const news = await res.json();

        const container = document.getElementById("newsList");
        container.innerHTML = "";

        news.forEach(item => {
            container.innerHTML += `
                <div class="news-card">
                    <img src="http://localhost:3000${item.image}" class="news-image">
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

    }catch(error){
        console.error("Failed to load public news", error);
    }
}

function viewNews(id) {
    window.location.href = `news-view.html?id=${id}`;
}