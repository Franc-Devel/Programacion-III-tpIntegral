import {
  getMovies,
  createMovie,
  deleteMovie,
  createReview,
} from "../api/moviesApi.js";

// Declaramos las variables vacías a nivel de módulo
let movies = [];
let tbody, adminPanel, movieForm, userDisplay;

function getUser() {
  const userStr = localStorage.getItem("user");
  return userStr ? JSON.parse(userStr) : null;
}

export async function initUI() {
  // Las inicializamos ACÁ adentro, asegurando que el DOM ya cargó
  tbody = document.getElementById("movies-tbody");
  adminPanel = document.getElementById("admin-panel");
  movieForm = document.getElementById("movie-form");
  userDisplay = document.getElementById("user-display-name");

  const user = getUser();
  if (!user) {
    window.location.href = "/index.html";
    return;
  }

  userDisplay.textContent = `Hola, ${user.name} (${user.role.toUpperCase()})`;

  if (user.role === "admin" || user.role === "superadmin") {
    adminPanel.style.display = "block";
    movieForm.addEventListener("submit", handleCreateMovie);
  }

  await loadAndRenderMovies();
  tbody.addEventListener("click", handleTableClick);
}

async function loadAndRenderMovies() {
  movies = await getMovies();
  renderMovies();
}

function renderMovies() {
  tbody.innerHTML = "";
  const user = getUser();
  const isAdmin = user.role === "admin" || user.role === "superadmin";

  if (movies.length === 0) {
    tbody.innerHTML =
      "<tr><td colspan='5' style='text-align:center;'>No hay películas registradas en el catálogo actual.</td></tr>";
    return;
  }

  movies.forEach((movie) => {
    const tr = document.createElement("tr");
    let accionesHTML = `<button class="btn-primary review-btn" data-id="${movie.id}">Dejar Reseña</button>`;
    if (isAdmin) {
      accionesHTML += ` <button class="btn-danger delete-btn" style="background: red;" data-id="${movie.id}">Eliminar</button>`;
    }

    tr.innerHTML = `
      <td>${movie.title}</td>
      <td>${movie.director}</td>
      <td>${movie.year}</td>
      <td>${movie.genre ? movie.genre.name : "Sin género"}</td>
      <td>${accionesHTML}</td>
    `;
    tbody.appendChild(tr);
  });
}

async function handleCreateMovie(event) {
  event.preventDefault();
  const newMovie = {
    title: document.getElementById("movie-title").value,
    director: document.getElementById("movie-director").value,
    year: parseInt(document.getElementById("movie-year").value),
    duration: parseInt(document.getElementById("movie-duration").value),
    synopsis: document.getElementById("movie-synopsis").value,
    genreId: parseInt(document.getElementById("movie-genre").value),
  };

  try {
    const result = await createMovie(newMovie);
    if (result) {
      alert("¡Película agregada con éxito!");
      movieForm.reset();
      await loadAndRenderMovies();
    }
  } catch (error) {
    alert("Error al agregar película: " + error.message);
  }
}

async function handleTableClick(event) {
  const target = event.target;
  const id = parseInt(target.getAttribute("data-id"));
  if (!id) return;

  if (target.classList.contains("delete-btn")) {
    if (confirm("¿Estás seguro?")) {
      const ok = await deleteMovie(id);
      if (ok) await loadAndRenderMovies();
    }
  } else if (target.classList.contains("review-btn")) {
    const rating = prompt("Puntaje (1-5):");
    if (rating >= 1 && rating <= 5) {
      const comment = prompt("Comentario:");
      try {
        await createReview(id, parseInt(rating), comment || "");
        alert("¡Reseña guardada!");
      } catch (error) {
        alert(error.message);
      }
    }
  }
}
