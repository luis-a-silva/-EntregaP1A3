function mensagem(tipo, texto, escolhaCallback) {
    // Remove alerta anterior, se existir
    const alertaExistente = document.getElementById('alerta-centralizado');
    if (alertaExistente) alertaExistente.remove();

    // Ícones SVG
    const icones = {
        sucesso: `<svg width="32" height="32" fill="#4BB543"><circle cx="16" cy="16" r="16"/><path d="M10 17l4 4 8-8" stroke="#fff" stroke-width="3" fill="none"/></svg>`,
        erro: `<svg width="32" height="32" fill="#FF3333"><circle cx="16" cy="16" r="16"/><path d="M11 11l10 10M21 11l-10 10" stroke="#fff" stroke-width="3" fill="none"/></svg>`,
        atencao: `<svg width="32" height="32" fill="#FFC107"><circle cx="16" cy="16" r="16"/><rect x="15" y="8" width="2" height="12" fill="#fff"/><rect x="15" y="22" width="2" height="2" fill="#fff"/></svg>`
    };

    // Cores de fundo
    const cores = {
        sucesso: "#e6f9ec",
        erro: "#fdeaea",
        atencao: "#fff8e1"
    };

    // Cria container do alerta
    const alerta = document.createElement('div');
    alerta.id = 'alerta-centralizado';
    alerta.innerHTML = `
        <div class="alerta-conteudo">
            <span class="alerta-icone">${icones[tipo]}</span>
            <span class="alerta-texto">${texto}</span>
            ${tipo === 'atencao' ? `
                <div class="alerta-botoes">
                    <button id="alerta-confirmar">Confirmar</button>
                    <button id="alerta-cancelar">Cancelar</button>
                </div>
            ` : ''}
        </div>
    `;

    // Estilos do alerta
    const style = document.createElement('style');
    style.innerHTML = `
        #alerta-centralizado {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            display: flex; align-items: center; justify-content: center;
            background: rgba(0,0,0,0.25);
            z-index: 9999;
        }
        .alerta-conteudo {
            background: ${cores[tipo]};
            padding: 32px 24px;
            border-radius: 12px;
            box-shadow: 0 2px 16px rgba(0,0,0,0.15);
            display: flex;
            flex-direction: column;
            align-items: center;
            min-width: 260px;
            gap: 16px;
            animation: alertaFadeIn 0.2s;
        }
        .alerta-icone { margin-bottom: 8px; }
        .alerta-texto { font-size: 1.1rem; text-align: center; }
        .alerta-botoes { display: flex; gap: 12px; margin-top: 8px; }
        .alerta-botoes button {
            padding: 6px 18px;
            border: none;
            border-radius: 6px;
            font-size: 1rem;
            cursor: pointer;
            background: #1976d2;
            color: #fff;
            transition: background 0.2s;
        }
        .alerta-botoes button:hover { background: #125ea8; }
        @keyframes alertaFadeIn { from { opacity: 0; transform: scale(0.95);} to { opacity: 1; transform: scale(1);} }
    `;

    // Adiciona ao body
    document.body.appendChild(style);
    document.body.appendChild(alerta);

    // Fecha alerta ao clicar fora (exceto confirmação)
    if (tipo !== 'atencao') {
        alerta.addEventListener('click', (e) => {
            if (e.target === alerta) alerta.remove(), style.remove();
        });
        setTimeout(() => { alerta.remove(); style.remove(); }, 3000); // Fecha automático após 3s
    } else {
        document.getElementById('alerta-confirmar').onclick = () => {
            alerta.remove(); style.remove();
            if (typeof escolhaCallback === 'function') escolhaCallback(true);
        };
        document.getElementById('alerta-cancelar').onclick = () => {
            alerta.remove(); style.remove();
            if (typeof escolhaCallback === 'function') escolhaCallback(false);
        };
    }
}

// Exemplos de uso:
// mensagem('erro', 'Ops! aconteceu um erro!');
// mensagem('sucesso', 'Sucesso!');
// mensagem('atencao', 'Tem certeza disso?', function(confirmou) {
//     if (confirmou) mensagem('sucesso', 'Ação confirmada!');
//     else mensagem('erro', 'Ação cancelada!');
// });