import { logout } from "./api/authApi.js";
import { initUI } from "./ui/moviesUI.js";

// Esto asegura que la interfaz se cargue cuando el HTML esté listo
document.addEventListener("DOMContentLoaded", () => {
  initUI();

  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", logout);
  }
});
