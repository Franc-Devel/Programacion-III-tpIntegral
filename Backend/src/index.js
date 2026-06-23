import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler.js";
import categoryRoutes from "./routes/categories.routes.js";
import productRoutes from "./routes/products.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", authRoutes);

app.use(errorHandler);

app.listen(3000, () => console.log("Server on port 3000"));
