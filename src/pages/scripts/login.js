//Exibir formulários 
function showCadastrar() {
    document.getElementById("login-wrapper").classList.remove("login-active");
    document.getElementById("cadastrar-wrapper").classList.add("cadastrar-active");
}
function showLogin() {
    document.getElementById("cadastrar-wrapper").classList.remove("cadastrar-active");
    document.getElementById("login-wrapper").classList.add("login-active");
}
function showRedefinirSenha() {
    alert("Funcionalidade de redefinição de senha em desenvolvimento.");
}



//funções de logar via API (/auth/login)

//funções de registrar via API (/auth/register)