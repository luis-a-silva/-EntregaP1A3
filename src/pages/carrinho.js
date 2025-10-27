// Importando apenas as funções usadas na página do carrinho
import {
  alternarModos,
  inicializarDropdownPerfil,
  inicializarMenuLateral,
} from "./main.js";

// Ativa os botões de modo claro/escuro (#whiteMode, #darkMode)
alternarModos();

// Ativa o botão de dropdown do perfil (#btnPerfil)
inicializarDropdownPerfil();

// Ativa o botão de menu hamburger (#btn-menu)
inicializarMenuLateral();