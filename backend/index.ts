import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDb from "./config/connectDb";

// Load environment variables
dotenv.config();

// Initialize express
const app: Application = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);

// Database connection
connectDb();

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    status: "success",
    message: "Welcome to Flavor Fiesta API",
  });
});

// Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

export default app;
