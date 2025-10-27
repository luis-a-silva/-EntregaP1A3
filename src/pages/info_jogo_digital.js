document.addEventListener('DOMContentLoaded', () => {
  const formAvaliacao = document.querySelector('.form-avaliacao');
  const listaComentarios = document.querySelector('.lista-comentarios');
  const ratingInputs = document.querySelectorAll('.rating-input input[type="radio"]');
  const comentarioTextarea = document.getElementById('comentario');
  const btnVoltarTopo = document.querySelector('.btn-voltar-topo'); // Botão Voltar ao Topo

  // --- 1. CAPTURAR ENVIO DO FORMULÁRIO ---
  if (formAvaliacao) { // Verifica se o formulário existe
      formAvaliacao.addEventListener('submit', (event) => {
        event.preventDefault(); // Impede o recarregamento da página

        // --- 2. VALIDAR DADOS ---
        const notaSelecionada = document.querySelector('.rating-input input[type="radio"]:checked');
        const textoComentario = comentarioTextarea.value.trim();

        if (!notaSelecionada) {
          alert('Por favor, selecione uma nota (estrelas) antes de enviar.');
          return;
        }

        const notaValor = notaSelecionada.value;

        // --- 3. CRIAR NOVO COMENTÁRIO ---
        const novoId = `comentario-${Date.now()}`;
        const novoComentarioElement = criarElementoComentario(novoId, notaValor, textoComentario);

        // --- 4. ADICIONAR A LISTA ---
        if (listaComentarios) {
            listaComentarios.prepend(novoComentarioElement); // Adiciona no início
        }

        // --- 5. LIMPAR FORMULÁRIO ---
        formAvaliacao.reset();
        ratingInputs.forEach(input => input.checked = false);
        document.querySelectorAll('.rating-input label').forEach(label => {
             label.style.color = '';
        });

        // Rola suavemente até o novo comentário que foi adicionado
        novoComentarioElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        console.log('Avaliação adicionada:', { id: novoId, nota: notaValor, texto: textoComentario });
      });
  } 

  // --- 6. FUNCIONALIDADE EDITAR/EXCLUIR 
  if (listaComentarios) { // Verifica se a lista existe
      listaComentarios.addEventListener('click', (event) => {
        const target = event.target;
        const comentarioDiv = target.closest('.comentario-usuario');

        if (!comentarioDiv) return;

        // --- Botão Excluir ---
        if (target.classList.contains('btn-excluir')) {
          handleExcluir(comentarioDiv);
        }
        // --- Botão Editar ---
        else if (target.classList.contains('btn-editar')) {
          handleEditar(comentarioDiv);
        }
        // --- Botão Salvar Edição ---
         else if (target.classList.contains('btn-salvar-edicao')) {
            handleSalvarEdicao(comentarioDiv);
        }
        // --- Botão Cancelar Edição ---
        else if (target.classList.contains('btn-cancelar-edicao')) {
            handleCancelarEdicao(comentarioDiv);
        }
      });
  } 

  // --- 7. FUNCIONALIDADE BOTÃO VOLTAR AO TOPO ---
  if (btnVoltarTopo) { // Verifica se o botão existe
    btnVoltarTopo.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  } 



  /** Cria o elemento HTML para um novo comentário. */
  function criarElementoComentario(id, nota, texto) {
    const divComentario = document.createElement('div');
    divComentario.classList.add('comentario-usuario');
    divComentario.setAttribute('data-avaliacao-id', id);

    divComentario.innerHTML = `
      <div class="comentario-cabecalho">
        <span class="nome-usuario">Usuário: Você</span>
        <span class="nota-usuario">Nota: ${nota} ★</span>
      </div>
      <p class="texto-comentario">${texto ? `"${texto}"` : '"Sem comentário."'}</p>
      <div class="comentario-acoes">
        <button class="btn-acao btn-editar">Editar</button>
        <button class="btn-acao btn-excluir">Excluir</button>
      </div>
      <div class="edicao-container" style="display: none;"></div>
    `;
    return divComentario;
  }

  /** Lida com o clique no botão Excluir. */
  function handleExcluir(comentarioElement) {
    const id = comentarioElement.dataset.avaliacaoId;
    if (confirm('Tem certeza que deseja excluir esta avaliação?')) {
      comentarioElement.remove();
      console.log('Avaliação excluída:', id);
      // TODO: Adicionar chamada API para backend
    }
  }

  /** Prepara a interface para edição. */
  function handleEditar(comentarioElement) {
        const textoElement = comentarioElement.querySelector('.texto-comentario');
        const acoesOriginais = comentarioElement.querySelector('.comentario-acoes');
        const edicaoContainer = comentarioElement.querySelector('.edicao-container');

        // Se já estiver editando, não faz nada
        if (edicaoContainer && edicaoContainer.style.display === 'block') return;
        // Verifica se os elementos existem antes de prosseguir
        if (!textoElement || !acoesOriginais || !edicaoContainer) {
            console.error("Elementos necessários para edição não encontrados no comentário:", comentarioElement);
            return;
        }


        const textoAtual = textoElement.textContent.replace(/^"|"$/g, '').replace('Sem comentário.', '');
        comentarioElement.dataset.originalText = textoAtual;

        textoElement.style.display = 'none';
        acoesOriginais.style.display = 'none';

        edicaoContainer.innerHTML = `
            <textarea class="editar-textarea" rows="3">${textoAtual}</textarea>
            <div class="edicao-acoes">
                <button class="btn-acao btn-salvar-edicao">Salvar</button>
                <button class="btn-acao btn-cancelar-edicao">Cancelar</button>
            </div>
        `;

        edicaoContainer.style.display = 'block';
        const textarea = edicaoContainer.querySelector('.editar-textarea');
        if (textarea) textarea.focus();
    }

    /** Salva as alterações feitas na edição. */
    function handleSalvarEdicao(comentarioElement) {
        const textoElement = comentarioElement.querySelector('.texto-comentario');
        const acoesOriginais = comentarioElement.querySelector('.comentario-acoes');
        const edicaoContainer = comentarioElement.querySelector('.edicao-container');
        const textarea = edicaoContainer ? edicaoContainer.querySelector('.editar-textarea') : null;

        if (!textoElement || !acoesOriginais || !edicaoContainer || !textarea) {
             console.error("Elementos necessários para salvar edição não encontrados.");
             return; // Sai se algo estiver faltando
        }


        const novoTexto = textarea.value.trim();
        const id = comentarioElement.dataset.avaliacaoId;

        textoElement.textContent = novoTexto ? `"${novoTexto}"` : '"Sem comentário."';

        // Restaura a visualização normal
        textoElement.style.display = '';
        acoesOriginais.style.display = '';
        edicaoContainer.innerHTML = '';
        edicaoContainer.style.display = 'none';
        delete comentarioElement.dataset.originalText;

        console.log('Avaliação editada:', { id: id, novoTexto: novoTexto });
        // TODO: Adicionar chamada API para backend
    }

    /** Cancela a edição. */
    function handleCancelarEdicao(comentarioElement) {
        const textoElement = comentarioElement.querySelector('.texto-comentario');
        const acoesOriginais = comentarioElement.querySelector('.comentario-acoes');
        const edicaoContainer = comentarioElement.querySelector('.edicao-container');

         if (!textoElement || !acoesOriginais || !edicaoContainer) {
             console.error("Elementos necessários para cancelar edição não encontrados.");
             return; // Sai se algo estiver faltando
        }

        // Apenas restaura a visualização normal
        textoElement.style.display = '';
        acoesOriginais.style.display = '';
        edicaoContainer.innerHTML = '';
        edicaoContainer.style.display = 'none';
        delete comentarioElement.dataset.originalText; 

        console.log('Edição cancelada');
    }

}); 