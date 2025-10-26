import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes";
import productsRoutes from "./routes/productsRoutes";
import { auth } from "./middleware/auth";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.URL || "http://localhost:4000",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.status(200).send("Express with TypeScript");
});

// One protected test route
const requiereAuth: express.RequestHandler = (req, res, next) => {
  if (!req.user) return res.status(401).json({ error: "Unauthorized" });
  next();
};

app.get("/api/protected", auth, requiereAuth, (req, res) => {
  res.json({ ok: true, user: req.user });
});

// Routes
app.use("/uploads", express.static("uploads"));
app.use("/api/products", productsRoutes);
app.use("/api/auth", authRoutes);

export default app;
