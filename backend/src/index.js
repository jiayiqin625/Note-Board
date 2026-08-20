import "dotenv/config";
import express from "express";
import cors from "cors";

import noteRoutes from "./routes/NoteRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"],
  }),
);
app.use(express.json());
app.use(rateLimiter);

app.use((req, res, next) => {
  console.log("Hello");
  next();
});

app.use("/", noteRoutes);

connectDB().then(() => {
  app.listen(5000, () => {
    console.log("Backend server is running!");
  });
});
