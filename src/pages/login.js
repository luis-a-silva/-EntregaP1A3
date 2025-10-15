import { alternarModos, mostrarMensagem } from "./main.js";

function iniciarFormularios() {
    alternarModos();

    const containerLogin = document.getElementById("container-login");
    const containerCadastro = document.getElementById("container-cadastro");

    const btnIrParaCadastro = document.getElementById("btn-cadastrar");
    const btnIrParaLogin = document.getElementById("btn-login");

    btnIrParaCadastro.addEventListener("click", () => {
        containerLogin.classList.add("form-login-hide");
        containerLogin.classList.remove("form-login-active");
        containerCadastro.classList.add("form-cadastro-active");
    });

    btnIrParaLogin.addEventListener("click", () => {
        containerCadastro.classList.remove("form-cadastro-active");
        containerLogin.classList.remove("form-login-hide");
        containerLogin.classList.add("form-login-active");
    });
}

const loginForm = document.getElementById("login-form");
const cadastrarForm = document.getElementById("cadastrar-form");

loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const email = document.getElementById("email-login").value;
    const senha = document.getElementById("password-login").value;

    if (email === "admin@email.com.br" && senha === "admin123") {
        mostrarMensagem("Login efetuado com sucesso!", "success");
        setInterval(() => {
            window.location.href = "index.html";
        }, 3000);
    } else {
        mostrarMensagem("Usuário ou senha incorretos.", "danger");
    }
});


cadastrarForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email-cadastro").value;
    const senha = document.getElementById("password-cadastro").value;
    const confirmarSenha = document.getElementById("confirm-password-cadastro").value;

    if (senha !== confirmarSenha) {
        mostrarMensagem("As senhas não coincidem.", "danger");
        return;
    }
    if (nome && email && senha) {
        mostrarMensagem("Cadastro realizado com sucesso!", "success");
        setInterval(() => {
            window.location.href = "login.html";
        }, 3000);
    } else {
        mostrarMensagem("Por favor, preencha todos os campos.", "danger");
    }
});

iniciarFormularios();