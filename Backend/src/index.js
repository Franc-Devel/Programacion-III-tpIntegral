import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler.js";
import authRoutes from "./routes/auth.routes.js";
import moviesRoutes from "./routes/movies.routes.js"; // Inyectamos movies
import reviewsRoutes from "./routes/reviews.routes.js"; // Inyectamos reviews

const app = express();

app.use(cors());
app.use(express.json());

// Endpoints
app.use("/api", authRoutes);
app.use("/api", moviesRoutes);
app.use("/api", reviewsRoutes);

app.use(errorHandler);

app.listen(3000, () => console.log("Server on port 3000"));
