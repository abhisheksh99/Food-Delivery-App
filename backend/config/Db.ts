import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI is missing");

    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");
  } catch (error: unknown) {
    console.error(
      "MongoDB connection error:",
      error instanceof Error ? error.message : "Unknown error"
    );
    process.exit(1);
  }
};

export default connectDB;
