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
