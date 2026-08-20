import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";

import noteRoutes from "./routes/NoteRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

const app = express();
const __dirname = path.resolve();

if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: ["http://localhost:5173"],
    }),
  );
}

app.use(express.json());
app.use(rateLimiter);

app.use((req, res, next) => {
  console.log("Hello");
  next();
});

app.use("/api/notes", noteRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get(/.*$/, (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

connectDB().then(() => {
  app.listen(5000, () => {
    console.log("Backend server is running!");
  });
});
