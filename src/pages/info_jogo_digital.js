import {
  alternarModos,
  mostrarMensagem,
  inicializarDropdownPerfil,
  inicializarMenuLateral,
} from "./main.js";

// --- INICIALIZAÇÃO DOS MÓDULOS PRINCIPAIS ---
inicializarDropdownPerfil();
inicializarMenuLateral();
alternarModos();

// --- DROPDOWN INTERATIVO (PARA A SIDEBAR) ---
document.querySelectorAll(".sidebar .dropdown-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const dropdown = btn.parentElement;
    dropdown.classList.toggle("open");

    // Fecha os outros dropdowns abertos (APENAS NA SIDEBAR)
    document.querySelectorAll(".sidebar .dropdown").forEach((other) => {
      if (other !== dropdown) other.classList.remove("open");
    });
  });
});

// --- MODAL DE CONFIRMAÇÃO DE COMPRA ---
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
    mostrarMensagem("Jogo comprado com sucesso.", "success");
  });

  cancelBtn.addEventListener("click", () => {
    fecharModal();
    mostrarMensagem("Ação de compra cancelada.", "danger");
  });
}

// Associa os botões de compra para abrir o modal de confirmação
document.querySelectorAll(".btn-comprar, .btn-comprar-grande").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    mostrarConfirmacaoCompra();
  });
});

// --- LÓGICA PARA EDITAR E EXCLUIR COMENTÁRIOS ---

/**
 * Cria um modal de confirmação genérico (para exclusão).
 */
function mostrarModalConfirmacao(titulo, mensagem, textoConfirmar) {
  // Remove modal anterior se existir
  const existente = document.getElementById("modal-confirm-generico");
  if (existente) existente.remove();

  const modalId = "modal-confirm-generico";
  const modalStyleId = `${modalId}-style`;

  const modal = document.createElement("div");
  modal.id = modalId;
  modal.innerHTML = `
    <div class="modal-confirm-content" role="dialog" aria-modal="true" aria-labelledby="${modalId}-title">
      <div id="${modalId}-title" style="font-weight:600;margin-bottom:8px; color: #000000">${titulo}</div>
      <div style="margin-bottom:16px; color: #000000">${mensagem}</div>
      <div style="display:flex;gap:12px;justify-content:center">
        <button id="confirmBtn" style="padding:8px 16px;border-radius:8px;background:${
          textoConfirmar === "Excluir" ? "#e55757" : "#1976d2"
        };color:#fff;border:none;cursor:pointer">${textoConfirmar}</button>
        <button id="cancelBtn" style="padding:8px 16px;border-radius:8px;background:#eee;border:none;cursor:pointer">Cancelar</button>
      </div>
    </div>
  `;

  const style = document.createElement("style");
  style.id = modalStyleId;
  style.textContent = `
    #${modalId}{position:fixed;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.35);z-index:9999}
    .modal-confirm-content{background:#fff;padding:22px;border-radius:10px;min-width:280px;box-shadow:0 6px 30px rgba(0,0,0,0.25);text-align:center}
  `;

  document.body.appendChild(style);
  document.body.appendChild(modal);

  return new Promise((resolve) => {
    const fecharModal = (resultado) => {
      modal.remove();
      style.remove();
      resolve(resultado);
    };

    modal
      .querySelector("#confirmBtn")
      .addEventListener("click", () => fecharModal(true));
    modal
      .querySelector("#cancelBtn")
      .addEventListener("click", () => fecharModal(false));
  });
}

/**
 * Cria o HTML para o seletor de estrelas (rating).
 * (CORREÇÃO DE 5 ESTRELAS)
 */
function criarHtmlRating(nomeInput, notaAtual = 0) {
  let starsHTML = "";
  // O loop DEVE começar em 'i = 5'. Isso garante apenas 5 estrelas.
  for (let i = 5; i >= 1; i--) {
    const isChecked = i === notaAtual ? "checked" : "";
    starsHTML += `
      <input type="radio" id="${nomeInput}-star${i}" name="${nomeInput}-rating" value="${i}" ${isChecked} />
      <label for="${nomeInput}-star${i}" title="${i} estrelas"></label>
    `;
  }
  return `<div class="rating-input">${starsHTML}</div>`;
}

/**
 * Pega a nota atual de um comentário (contando as estrelas '★').
 * (Função corrigida para ler "Nota: 5 ★")
 */
function getNotaDoComentario(comentarioEl) {
  const notaTexto = comentarioEl.querySelector(".nota-usuario")?.textContent; // "Nota: 3 ★"
  if (!notaTexto) return 0;

  // Procura pelo padrão "Nota: " seguido de um ou mais dígitos
  const match = notaTexto.match(/Nota:\s*(\d+)/);

  if (match && match[1]) {
    return parseInt(match[1], 10);
  }

  // Fallback (se não encontrar o padrão, tenta contar as estrelas)
  return (notaTexto.match(/★/g) || []).length;
}

/**
 * Verifica se o comentário pertence ao usuário atual (contém "(Você)").
 */
function isComentarioDoUsuario(comentarioEl) {
  const nomeUsuario = comentarioEl.querySelector(".nome-usuario")?.textContent || "";
  return nomeUsuario.includes("(Você)") || nomeUsuario.includes("Adailton123"); // Adicionado seu usuário
}

/**
 * Lida com o clique no botão "Editar".
 */
function aoClicarEditar(e) {
  const comentarioEl = e.target.closest(".comentario-usuario");

  if (!isComentarioDoUsuario(comentarioEl)) {
     mostrarMensagem("Você só pode editar seus próprios comentários.", "danger");
     return;
  }
  if (comentarioEl.querySelector(".form-edicao-ativo")) return;

  const cabecalho = comentarioEl.querySelector(".comentario-cabecalho");
  const texto = comentarioEl.querySelector(".texto-comentario");
  const acoes = comentarioEl.querySelector(".comentario-acoes");

  const textoAtual = texto.textContent.trim().replace(/^“|”$/g, ""); // Remove aspas
  const notaAtual = getNotaDoComentario(comentarioEl); // Usa a função corrigida

  const formEdicao = document.createElement("div");
  formEdicao.className = "form-avaliacao form-edicao-ativo";
  formEdicao.innerHTML = `
    <h3>Editar seu comentário</h3>
    <div class="campo-form-avaliacao">
      <label>Sua nota:</label>
      ${criarHtmlRating("edit", notaAtual)}
    </div>
    <div class="campo-form-avaliacao">
      <label for="edit-comment-text">Seu comentário:</label>
      <textarea id="edit-comment-text" rows="4">${textoAtual}</textarea>
    </div>
    <button class="btn-salvar-edicao btn-enviar-avaliacao" style="margin-right: 10px;">Salvar</button>
    <button class="btn-cancelar-edicao btn-acao">Cancelar</button>
  `;

  cabecalho.style.display = "none";
  texto.style.display = "none";
  acoes.style.display = "none";
  comentarioEl.appendChild(formEdicao);

  formEdicao
    .querySelector(".btn-salvar-edicao")
    .addEventListener("click", () => {
      const novoTexto = formEdicao.querySelector("#edit-comment-text").value;
      const novaNotaEl = formEdicao.querySelector(
        "input[name='edit-rating']:checked"
      );
      const novaNota = novaNotaEl ? parseInt(novaNotaEl.value, 10) : notaAtual;

      texto.innerHTML = `“${novoTexto}”`;
      comentarioEl.querySelector(".nota-usuario").innerHTML = `Nota: ${novaNota} ★`;

      formEdicao.remove();
      cabecalho.style.display = "";
      texto.style.display = "";
      acoes.style.display = "";

      mostrarMensagem("Comentário atualizado com sucesso.", "success");
    });

  formEdicao
    .querySelector(".btn-cancelar-edicao")
    .addEventListener("click", () => {
      formEdicao.remove();
      cabecalho.style.display = "";
      texto.style.display = "";
      acoes.style.display = "";
    });
}

/**
 * Lida com o clique no botão "Excluir".
 */
async function aoClicarExcluir(e) {
  const comentarioEl = e.target.closest(".comentario-usuario");

  if (!isComentarioDoUsuario(comentarioEl)) {
    mostrarMensagem("Você só pode excluir seus próprios comentários.", "danger");
    return;
  }

  const confirmado = await mostrarModalConfirmacao(
    "Excluir comentário",
    "Tem certeza que deseja excluir este comentário? Esta ação não pode ser desfeita.",
    "Excluir"
  );

  if (confirmado) {
    comentarioEl.remove();
    mostrarMensagem("Comentário excluído.", "success");
  } else {
    mostrarMensagem("Exclusão cancelada.", "danger");
  }
}

/**
 * Inicializa todos os ouvintes de eventos para os comentários.
 */
function inicializarAcoesComentarios() {
  document.querySelectorAll(".comentario-usuario").forEach((comentarioEl) => {
    if (!isComentarioDoUsuario(comentarioEl)) {
      const acoes = comentarioEl.querySelector(".comentario-acoes");
      if (acoes) {
        acoes.style.display = "none";
      }
    }
  });

  document.querySelectorAll(".btn-editar").forEach((btn) => {
    const comentarioEl = btn.closest(".comentario-usuario");
    if (isComentarioDoUsuario(comentarioEl)) {
      btn.addEventListener("click", aoClicarEditar);
    }
  });

  document.querySelectorAll(".btn-excluir").forEach((btn) => {
    const comentarioEl = btn.closest(".comentario-usuario");
    if (isComentarioDoUsuario(comentarioEl)) {
      btn.addEventListener("click", aoClicarExcluir);
    }
  });

  // --- LÓGICA DE NOVO COMENTÁRIO (SEM POPUP) ---
  const formNovoComentario = document.querySelector(
    "form.form-avaliacao:not(.form-edicao-ativo)"
  );
  if (formNovoComentario) {
    formNovoComentario.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const textarea = formNovoComentario.querySelector("textarea");
      const notaEl = formNovoComentario.querySelector(
        'input[name="rating"]:checked'
      );
      
      const textoComentario = textarea.value.trim();
      const nota = notaEl ? parseInt(notaEl.value, 10) : 0;

      if (textoComentario && nota > 0) {
        const listaComentarios = document.querySelector(".lista-comentarios");
        if (!listaComentarios) return;

        const novoComentarioEl = document.createElement("div");
        novoComentarioEl.className = "comentario-usuario novo-comentario"; 
        novoComentarioEl.innerHTML = `
          <div class="comentario-cabecalho">
            <span class="nome-usuario">Usuário: (Você)</span> 
            <span class="nota-usuario">Nota: ${nota} ★</span>
          </div>
          <p class="texto-comentario">
            “${textoComentario}”
          </p>
          <div class="comentario-acoes">
            <button class="btn-acao btn-editar">Editar</button>
            <button class="btn-acao btn-excluir">Excluir</button>
          </div>
        `;

        listaComentarios.prepend(novoComentarioEl);

        novoComentarioEl
          .querySelector(".btn-editar")
          .addEventListener("click", aoClicarEditar);
        novoComentarioEl
          .querySelector(".btn-excluir")
          .addEventListener("click", aoClicarExcluir);

        textarea.value = "";
        notaEl.checked = false;
        
        novoComentarioEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
      } else {
        mostrarMensagem("Por favor, preencha a nota e o comentário.", "danger");
      }
    });
  }

  // Lógica para o novo botão "Adicionar ao Carrinho"
  document.querySelectorAll(".btn-add-cart").forEach((btn) => {
    btn.addEventListener("click", () => {
      mostrarMensagem("Jogo adicionado ao carrinho!", "success");
      const cartCount = document.getElementById("cartCount");
      if (cartCount) {
        let count = parseInt(cartCount.textContent, 10);
        cartCount.textContent = count + 1;
      }
    });
  });
}

// --- INICIALIZAÇÃO APÓS O CARREGAMENTO DO DOM ---
document.addEventListener("DOMContentLoaded", () => {
  // Lógica da Sidebar
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

  const btnCarrinho = document.getElementById("btnCarrinho");
  if (btnCarrinho) {
    btnCarrinho.addEventListener("click", () => {
      // Redireciona para a página do carrinho
      window.location.href = "carrinho.html";
    });
  }

  // Lógica dos Comentários e Botões da Página
  inicializarAcoesComentarios();
});