/*document.addEventListener("DOMContentLoaded", () => {
    let slideIndex = 0;
    const slides = document.querySelectorAll(".carousel .slide");
    const prevButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.display = i === index ? "flex" : "none";
        });
    }

    function nextSlide() {
        slideIndex = (slideIndex + 1) % slides.length;
        showSlide(slideIndex);
    }

    function prevSlide() {
        slideIndex = (slideIndex - 1 + slides.length) % slides.length;
        showSlide(slideIndex);
    }

    // Event listeners for buttons
    nextButton.addEventListener("click", nextSlide);
    prevButton.addEventListener("click", prevSlide);

    // Auto slide every 4 seconds
    showSlide(slideIndex);
    setInterval(nextSlide, 4000);
});
 */