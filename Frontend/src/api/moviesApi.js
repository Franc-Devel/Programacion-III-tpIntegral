import { parseResponse } from "../utils/http.js";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

// Función auxiliar para obtener el token actualizado en cada petición
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };
};

export async function getMovies() {
  try {
    const response = await fetch(`${API_URL}/movies`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
}

// SOLO ADMIN: Crear película
export async function createMovie(movie) {
  const response = await fetch(`${API_URL}/movies`, {
    method: "POST",
    headers: getAuthHeaders(), // Inyectamos el JWT
    body: JSON.stringify(movie),
  });
  return await parseResponse(response);
}

// SOLO ADMIN: Eliminar película
export async function deleteMovie(id) {
  try {
    const response = await fetch(`${API_URL}/movies/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(), // Inyectamos el JWT
    });
    if (!response.ok)
      throw new Error("No tienes permisos o la película no existe");
    alert("Película eliminada exitosamente.");
    return true;
  } catch (error) {
    console.error("Error deleting movie:", error);
    alert(error.message);
    return false;
  }
}

// CUALQUIER USUARIO LOGUEADO: Dejar reseña
export async function createReview(movieId, rating, comment) {
  const response = await fetch(`${API_URL}/movies/${movieId}/reviews`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ rating, comment }),
  });
  return await parseResponse(response);
}
