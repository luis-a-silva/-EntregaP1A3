import { alternarModos , inicializarDropdownPerfil, inicializarMenuLateral, mostrarMensagem} from "./main.js";

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

// Funcionalidade do carrossel
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

//Acionar evento botão comprar
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


// ===== CARRINHO =====
let cartCount = 0;
const cartBadge = document.getElementById("cartCount");

//Adicionar evento dos botões de adicionar ao carrinho
document.querySelectorAll(".btn-add-cart").forEach((btn) => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        mostrarMensagem('Item adicionado ao carrinho!', 'success');
        cartCount++;
        cartBadge.textContent = cartCount;
    });
});

// ===== FAVORITOS =====
document.addEventListener("click", (e) => {
  const favBtn = e.target.closest(".btn-favorito");
  if (favBtn) {
    favBtn.classList.toggle("ativo");
    mostrarMensagem(favBtn.classList.contains("ativo") ? 'Adicionado aos favoritos!' : 'Removido dos favoritos!', 'info');
  }
});

// Botão Flutuante + Modal Jogos
const modalJogos = document.getElementById("modalJogos");
const btnJogos = document.getElementById("btnJogos");
const fecharJogos = document.getElementById("fecharJogos");

btnJogos.addEventListener("click", () => {
  modalJogos.style.display = "flex";
});

fecharJogos.addEventListener("click", () => {
  modalJogos.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modalJogos) {
    modalJogos.style.display = "none";
  }
});


  const btnCarrinho = document.getElementById("btnCarrinho");
  if (btnCarrinho) {
    btnCarrinho.addEventListener("click", () => {
      // Redireciona para a página do carrinho
      window.location.href = "carrinho.html";
    });
  }

//inicializando funções importadas
alternarModos();
inicializarDropdownPerfil();
inicializarMenuLateral();


