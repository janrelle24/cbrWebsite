console.log("News view script loaded");

document.addEventListener("DOMContentLoaded", async function(){
    const params = new URLSearchParams(window.location.search);
    const newsId = params.get("id");

    if(!newsId){
        document.getElementById("newsContainer").innerHTML = "<p>No news ID provided.</p>";
        return;
    }
    try{
        const res = await fetch(`http://localhost:3000/api/public/news/${newsId}`);
        const news = await res.json();

        if (!news) {
            document.getElementById("newsContainer").innerHTML = "<p>News not found.</p>";
            return;
        }
        // Render full news content
        document.getElementById("newsContainer").innerHTML = `
            <div class="view-item">
                <div class="view-title">${news.title}</div>
                <p class="view-date"><i>${new Date(news.date).toLocaleDateString()}</i></p>
                <img class="view-image" src="http://localhost:3000${news.image}" alt="${news.title}" />
                <div class="view-content">${news.content}</div>
            </div>
        `;

    }catch(error){
        console.error("Failed to load news:", error);
        document.getElementById("newsContainer").innerHTML = "<p>Failed to load news details.</p>";
    }
});