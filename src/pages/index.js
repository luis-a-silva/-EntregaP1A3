import { alternarModos } from "./main.js";

// Dropdown interativo
document.querySelectorAll(".dropdown-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
        const dropdown = btn.parentElement;
        dropdown.classList.toggle("open");

        // Fecha os outros dropdowns abertos
        document.querySelectorAll(".dropdown").forEach((other) => {
            if (other !== dropdown) other.classList.remove("open");
        });
    });
});

// Carousel Functionality
const track = document.getElementById('carouselTrack');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
let currentPosition = 0;
const cardWidth = 320; // 300px + 20px gap

nextBtn.addEventListener('click', () => {
    const maxScroll = track.scrollWidth - track.parentElement.clientWidth;
    currentPosition = Math.min(currentPosition + cardWidth, maxScroll);
    track.style.transform = `translateX(-${currentPosition}px)`;
});

prevBtn.addEventListener('click', () => {
    currentPosition = Math.max(currentPosition - cardWidth, 0);
    track.style.transform = `translateX(-${currentPosition}px)`;
});

alternarModos();