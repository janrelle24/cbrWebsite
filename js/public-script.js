console.log("Public script loaded");

document.addEventListener("DOMContentLoaded", () =>{
    loadCarouselNews();
    loadOrdinances();
    loadMembers();
    loadLiveStream();
    initializeCalendar ();
});
//load news for carousel
async function loadCarouselNews(){
    try{
        const res = await fetch("http://localhost:3000/api/public/news");
        const news = await res.json();

        const carosel = document.getElementById("carosel");
        carosel.innerHTML = "";

        news.slice(0,3).forEach(item =>{
            carosel.innerHTML += `
                <div class="slide fade">
                    <div class="img-side">
                        <img src="http://localhost:3000${item.image}" alt="${item.title}">
                    </div>
                    <div class="content">
                        <h3 class="script-title">${item.title}</h3>
                        <p class="date"><i>${new Date(item.date).toLocaleDateString()}</i></p>
                        <p class="script">${item.content.substring(0, 200)}...</p>
                        <button class="read-btn" onclick="viewNews('${item._id}')">Read More</button>
                        <div class="btn">
                            <div id="prev" class="btn-icon prev" title="previous button">
                                <i class="fa-solid fa-arrow-left"></i>
                            </div>
                            <div id="next" class="btn-icon next" title="next button">
                                <i class="fa-solid fa-arrow-right"></i>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
        initializeNewsCarousel();
    }catch(error){
        console.error("Failed to load carousel news", error);
    }
}
async function loadOrdinances(){
    try{
        const res = await fetch("http://localhost:3000/api/public/ordinance");
        const ordinances = await res.json();

        const grid = document.getElementById("ordinanceGrid");
        grid.innerHTML = "";

        ordinances.forEach(item =>{
            grid.innerHTML += `
                <div class="ordinance-slide">
                    <div class="cards">
                        <h4 class="ordinance-title">${item.title}</h4>
                        <p class="ordinace-date">${new Date(item.date).toLocaleDateString()}</p>
                        <p class="ordinance-content">${item.content.substring(0, 250)}...</p>
                        <button class="ordinance-btn" onclick="viewOrdinance('${item._id}')">Read More</button>
                    </div>
                </div>
            `;
        });
        initializeOrdinanceCarousel();
    }catch(error){
        console.error("Failed to load ordinances", error);
    }
}
function viewNews(id) {
    window.location.href = `news-view.html?id=${id}`;
}

function viewOrdinance(id) {
    window.location.href = `ordinance-view.html?id=${id}`;
}
async function loadMembers(){
    try{
        const res = await fetch("http://localhost:3000/api/public/members");
        const members = await res.json();

        const memberWrapper = document.getElementById("memberWrapper");
        memberWrapper.innerHTML = "";
        members.forEach(item => {
            memberWrapper.innerHTML += `
                <div class="member-card">
                    <img src="http://localhost:3000${item.image}" alt="${item.name}">
                    <div class="member-desc">${item.name} - ${item.position}</div>
                </div>
            `;
        } );
    }catch(error){
        console.error("Failed to load members", error);
    }
}
async function loadLiveStream(){
    try{
        const res = await fetch("http://localhost:3000/api/public/live");
        const lives = await res.json();
        const liveStreamContainer = document.getElementById("liveStreamContainer");

        if (!lives.length) {
            liveStreamContainer.innerHTML = "<p>No live stream available at the moment.</p>";
            return;
        }
        // Get the most recent livestream
        const live = lives[0];
        let embedUrl = live.embedUrl;

        // Convert watch URL → embed URL if needed
        if(embedUrl.includes("watch?v=")){
            embedUrl = embedUrl.replace("watch?v=", "embed/");
        }

        liveStreamContainer.innerHTML = `
            <iframe 
                src="${embedUrl}?&autoplay=1&mute=1"
                title="${live.title || 'Live Stream'}"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen>
            </iframe>
        `;
    }catch(error){
        console.error("Failed to load livestream", error);
        const liveStreamContainer = document.getElementById("liveStreamContainer");
        liveStreamContainer.innerHTML = "<p>Live stream is currently unavailable.</p>";
    }
}

function initializeNewsCarousel (){
    let slideIndex = 0;
    const slides = document.querySelectorAll(".carosel .slide");
    const prevBtn = document.querySelectorAll(".prev");
    const nextBtn = document.querySelectorAll(".next");

    function showSlide(index){
        slides.forEach((slide, i) =>{
            slide.style.display = i === index ? "flex" : "none";
        });
    }
    function nextSlide(){
        slideIndex = (slideIndex + 1) % slides.length;
        showSlide(slideIndex);
    }
    function prevSlide(){
        slideIndex = (slideIndex - 1 + slides.length) % slides.length;
        showSlide(slideIndex);
    }
    //add event listener
    nextBtn.forEach(btn => btn.addEventListener("click", nextSlide));
    prevBtn.forEach(btn => btn.addEventListener("click", prevSlide));

    // Auto slide every 4 seconds
    showSlide(slideIndex);
    setInterval(nextSlide, 4000);
};

function initializeCalendar (){
    const monthYear = document.getElementById("month-year");
    const daysContainer = document.getElementById("days");
    const leftBtn = document.getElementById("angle-left");
    const rightBtn = document.getElementById("angle-right");
    const calPrevYear = document.getElementById("cal-prev");
    const calNextYear = document.getElementById("cal-next");

    const months = [
        'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 
        'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
    ];
    let currentDate =new Date();
    let today = new Date();

    function renderCalendar(date){
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const lastDay = new Date(year, month + 1, 0).getDate();

        monthYear.textContent = `${months[month]} ${year}`;

        daysContainer.innerHTML = '';
        //previous month's dates
        
        const prevMonthsLastDay = new Date(year, month, 0).getDate();
        for(let i = firstDay; i > 0; i--){
            const dayDiv = document.createElement('div');
            dayDiv.textContent = prevMonthsLastDay - i + 1;
            dayDiv.classList.add('fade');
            daysContainer.appendChild(dayDiv);
        }
        //current months date
        for(let i = 1; i <= lastDay; i++){
            const dayDiv = document.createElement('div');
            dayDiv.textContent = i;
            if(i === today.getDate() && month === today.getMonth() && year === today.getFullYear()){
                dayDiv.classList.add('today');
            }
            daysContainer.appendChild(dayDiv);
        }
        //next months date
        const nextMonthStartDay = 7 - new Date(year, month + 1, 0).getDay() - 1;
        for(let i = 1; i <= nextMonthStartDay; i++){
            const dayDiv = document.createElement('div');
            dayDiv.textContent = i;
            dayDiv.classList.add('fade');
            daysContainer.appendChild(dayDiv);
        }
    }
    /**previous & next btn for month */
    leftBtn.addEventListener('click', function (){
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(currentDate);
    });
    rightBtn.addEventListener('click', function (){
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(currentDate);
    });
    /**previous & next btn for years */
    calPrevYear.addEventListener('click', function(){
        currentDate.setFullYear(currentDate.getFullYear() - 1);
        renderCalendar(currentDate);
    });
    calNextYear.addEventListener('click', function(){
        currentDate.setFullYear(currentDate.getFullYear() + 1);
        renderCalendar(currentDate);
    });

    renderCalendar(currentDate);
};

function initializeOrdinanceCarousel () {
    let ordSlideIndex = 0;
    const ordSlides = document.querySelectorAll(".ordinance-grid .ordinance-slide");
    const ordPrevBtn = document.getElementById("ord-prev");
    const ordNextBtn = document.getElementById("ord-next");
    const slidesPerView = 3; //show 3 slides at once;

    function showOrdSlide(index){
        ordSlides.forEach((slide, i) =>{
            //show 3 slide per set
            //slide.style.display = i === index ? "block" : "none";
            if (i >= index && i < index + slidesPerView) {
                slide.style.display = "block";
            } else {
                slide.style.display = "none";
            }
        });
    }
    //move forward by 1
    function nextOrdSlide(){
        ordSlideIndex++;
        if(ordSlideIndex > ordSlides.length - slidesPerView){
            ordSlideIndex = 0;
        }
        showOrdSlide(ordSlideIndex);
    }
    function prevOrdSlide(){
        ordSlideIndex--;
        if(ordSlideIndex < 0){
            ordSlideIndex = ordSlides.length - slidesPerView;
        }
        
        showOrdSlide(ordSlideIndex);
    }
    //add event listener
    ordNextBtn.addEventListener("click", nextOrdSlide);
    ordPrevBtn.addEventListener("click", prevOrdSlide);

    // Auto slide every 5 seconds
    showOrdSlide(ordSlideIndex);
    setInterval(nextOrdSlide, 5000);
    
};

