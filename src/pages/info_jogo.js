import { alternarModos, mostrarMensagem, inicializarDropdownPerfil, inicializarMenuLateral }  from "./main.js";

inicializarDropdownPerfil();
inicializarMenuLateral();
alternarModos();

// Cria e exibe um modal centralizado para confirmar a compra
function mostrarConfirmacaoCompra() {
  // Remove modal anterior se existir
  const existente = document.getElementById("modal-confirm-compra");
  if (existente) existente.remove();

  const modal = document.createElement("div");
  modal.id = "modal-confirm-compra";
  modal.innerHTML = `
    <div class="modal-confirm-content" role="dialog" aria-modal="true" aria-labelledby="modal-confirm-title">
      <div id="modal-confirm-title" style="font-weight:600;margin-bottom:8px; color: #000000">Confirmar compra</div>
      <div style="margin-bottom:16px; color: #000000">Deseja confirmar a compra deste jogo?</div>
      <div style="display:flex;gap:12px;justify-content:center">
        <button id="confirmCompraBtn" style="padding:8px 16px;border-radius:8px;background:#1976d2;color:#fff;border:none;cursor:pointer">Confirmar</button>
        <button id="cancelCompraBtn" style="padding:8px 16px;border-radius:8px;background:#eee;border:none;cursor:pointer">Recusar</button>
      </div>
    </div>
  `;

  const style = document.createElement("style");
  style.id = "modal-confirm-compra-style";
  style.textContent = `
    #modal-confirm-compra{position:fixed;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.35);z-index:9999}
    .modal-confirm-content{background:#fff;padding:22px;border-radius:10px;min-width:280px;box-shadow:0 6px 30px rgba(0,0,0,0.25);text-align:center}
  `;

  document.body.appendChild(style);
  document.body.appendChild(modal);

  const confirmBtn = modal.querySelector("#confirmCompraBtn");
  const cancelBtn = modal.querySelector("#cancelCompraBtn");

  const fecharModal = () => {
    modal.remove();
    style.remove();
  };

  confirmBtn.addEventListener("click", () => {
    fecharModal();
    // chama a função exportada de main.js para mostrar mensagem de sucesso
    mostrarMensagem("Jogo comprado com sucesso.", "success");
  });

  cancelBtn.addEventListener("click", () => {
    fecharModal();
    // mostra mensagem de cancelamento/erro
    mostrarMensagem("Ação de compra cancelada.", "danger");
  });
}

// Associa os botões de compra para abrir o modal de confirmação
document.querySelectorAll(".btn-comprar").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    mostrarConfirmacaoCompra();
  });
});

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

