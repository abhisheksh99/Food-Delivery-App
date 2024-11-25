import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDb from "./config/connectDb";
import userRoutes from "./routes/userRoute";
import restaurantRoutes from "./routes/restaurantRoute";
import menuRoutes from "./routes/menuRoute";
import orderRoutes from "./routes/orderRoute";

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
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

// Database connection
connectDb();

// Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/restaurant", restaurantRoutes );
app.use("/api/v1/menu", menuRoutes);
app.use("/api/v1/order", orderRoutes);


// Server
const PORT = process.env.PORT || 3000;




app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

export default app;
