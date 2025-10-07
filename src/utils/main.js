const BASE_API = "http://localhost:3000";

//GET
export async function getFunction(endpoint) {
    const response = await fetch(`${BASE_API}/${endpoint}`);
    return response.json();
}

//POST
export async function postFunction(endpoint, data) {
    const response = await fetch(`${BASE_API}/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    return response.json();
}

//PUT
export async function putFunction(endpoint, data) {
    const response = await fetch(`${BASE_API}/${endpoint}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    return response.json();
}

//PATCH
export async function patchFunction(endpoint, data) {
    const response = await fetch(`${BASE_API}/${endpoint}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    return response.json();
}

//DELETE
export async function deleteFunction(endpoint, id) {
    const response = await fetch(`${BASE_API}/${endpoint}/${id}`, {
        method: "DELETE"
    });
    return response.ok;
}

/**
 * Exibe uma mensagem semelhante ao alert do Bootstrap.
 * @param {string} texto - Texto da mensagem.
 * @param {'success'|'danger'|'info'} tipo - Tipo da mensagem.
 */
export function mostrarMensagem(texto, tipo = "info") {
    const cores = {
        success: "#d4edda",
        danger: "#f8d7da",
        info: "#d1ecf1"
    };
    const coresBorda = {
        success: "#155724",
        danger: "#721c24",
        info: "#0c5460"
    };
    const coresTexto = {
        success: "#155724",
        danger: "#721c24",
        info: "#0c5460"
    };

    // Cria o elemento
    const alerta = document.createElement("div");
    alerta.textContent = texto;
    alerta.style.position = "fixed";
    alerta.style.top = "30px";
    alerta.style.left = "50%";
    alerta.style.transform = "translateX(-50%)";
    alerta.style.minWidth = "220px";
    alerta.style.maxWidth = "90vw";
    alerta.style.padding = "1rem 2rem";
    alerta.style.background = cores[tipo] || cores.info;
    alerta.style.border = `1.5px solid ${coresBorda[tipo] || coresBorda.info}`;
    alerta.style.color = coresTexto[tipo] || coresTexto.info;
    alerta.style.borderRadius = "6px";
    alerta.style.boxShadow = "0 2px 12px rgba(0,0,0,0.08)";
    alerta.style.fontSize = "1.05rem";
    alerta.style.zIndex = 9999;
    alerta.style.opacity = "0";
    alerta.style.transition = "opacity 0.3s";

    document.body.appendChild(alerta);

    // Fade in
    setTimeout(() => {
        alerta.style.opacity = "1";
    }, 10);

    // Remover após 3 segundos com fade out
    setTimeout(() => {
        alerta.style.opacity = "0";
        setTimeout(() => {
            alerta.remove();
        }, 300);
    }, 3000);
}