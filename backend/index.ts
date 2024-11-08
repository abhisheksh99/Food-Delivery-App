import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/Db";
import userRoutes from "./routes/userRoutes"


const app = express();
connectDB()
app.use(express.json());
app.use(cors());

app.use("/api/user",userRoutes)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});