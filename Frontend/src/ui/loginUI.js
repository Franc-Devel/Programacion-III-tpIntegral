import { login } from "../api/authApi.js";
import { validarLogin } from "../utils/validaciones.js";

export function inicializarLogin() {
  const loginForm = document.getElementById("login-form");
  if (!loginForm) return;
  loginForm.addEventListener("submit", loginHandler);
}

async function loginHandler(event) {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  if (!validarLogin(email, password)) {
    alert("Por favor, ingresa un email válido y una contraseña no vacía.");
    return;
  }
  const result = await login(email, password);
  if (result) {
    window.location.href = "/src/pages/movies.html";
  } else {
    alert("Error al iniciar sesión. Verifica tus credenciales.");
  }
}
