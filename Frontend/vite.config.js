import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  root: "./",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        movies: resolve(__dirname, "src/pages/movies.html"), // Actualizado a movies
      },
    },
  },
});
