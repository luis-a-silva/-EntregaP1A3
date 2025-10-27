import {
  alternarModos,
  inicializarDropdownPerfil,
  inicializarMenuLateral,
} from "./main.js";


// Ativa os dropdowns existem na <aside class="sidebar">

document.querySelectorAll(".dropdown-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const dropdown = btn.parentElement;
    dropdown.classList.toggle("open");

    // Fecha os outros dropdowns abertos na sidebar
    // Seleciona apenas os dropdowns dentro da sidebar para não
    // conflitar com o dropdown de perfil no header
    document.querySelectorAll(".sidebar .dropdown").forEach((other) => {
      if (other !== dropdown) {
        other.classList.remove("open");
      }
    });
  });
});

// Ativa os botões de modo claro/escuro 
alternarModos();

// Ativa o botão de dropdown do perfil 
inicializarDropdownPerfil();

// Ativa o botão de menu hamburger 
inicializarMenuLateral();