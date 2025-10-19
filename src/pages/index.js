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


document.querySelectorAll(".btn-comprar").forEach((btn) => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        const status = document.getElementById("statusRegion");
        // mensagem clara (heurística 1 e 9)
        status.innerHTML = `
      <div id="purchaseToast" style="
            background:var(--cor-fundo-componente);
            opacity:0.85;
            padding:10px 14px;
            border-radius:8px;
            box-shadow:0 6px 18px rgba(0,0,0,0.4);
            color:var(--cor-texto-principal);      
            position: fixed;
            top: 0; 
            left: 0; 
            right: 0; 
            bottom: 0;
            display: flex; 
            align-items: center; 
            justify-content: center;
            z-index: 9999;">
        Redirecionando para a página do jogo...
        <button id="cancelRedirect" style="margin-left:12px;padding:6px 10px;border-radius:6px;background:transparent;border:1px solid rgba(255,255,255,0.08);color:var(--cor-texto-principal);cursor:pointer;">Cancelar</button>
      </div>
    `;
        let cancelled = false;
        const cancelBtn = document.getElementById("cancelRedirect");
        const toastTimeout = setTimeout(() => {
            if (!cancelled) {
                window.location.href = "info_jogo_digital.html";
            }
        }, 2500); // 2.5s para desfazer (heurística 3)

        cancelBtn.addEventListener("click", () => {
            cancelled = true;
            clearTimeout(toastTimeout);
            setTimeout(() => (status.textContent = ""), 1800);
        });
    });
});


alternarModos();


document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.getElementById("btn-menu");
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");

  if (menuButton && sidebar && overlay) {
    const toggleMenu = () => {
      sidebar.classList.toggle("open");
      overlay.classList.toggle("open");

      const isExpanded = sidebar.classList.contains("open");
      menuButton.setAttribute("aria-expanded", isExpanded);
    };

    menuButton.addEventListener("click", toggleMenu);
    overlay.addEventListener("click", toggleMenu);
  }
});