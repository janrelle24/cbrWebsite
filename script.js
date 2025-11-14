document.addEventListener("DOMContentLoaded", () =>{
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
});

document.addEventListener("DOMContentLoaded", () =>{
    const monthYear = document.getElementById("month-year");
    const daysContainer = document.getElementById("days");

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
        //current months date
        for(let i = 1; i <= lastDay; i++){
            const dayDiv = document.createElement('div');
            dayDiv.textContent = i;
            if(i === today.getDate() && month === today.getMonth() && year === today.getFullYear()){
                dayDiv.classList.add('today');
            }
            daysContainer.appendChild(dayDiv);
        }
    }
    renderCalendar(currentDate);
});
