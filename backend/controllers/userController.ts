import asyncHandler from "express-async-handler";
import User from "../models/userModel";
import { Request, Response } from "express"; 

// Create a new user
export const createUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { auth0Id } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ auth0Id });
    if (existingUser) {
        res.status(400).json({ message: "User already exists." });
        return; 
    }

    // Create a new user
    const newUser = new User(req.body);

    // Save the new user to the database
    await newUser.save();

    // Respond with the created user's details (excluding sensitive data)
    res.status(201).json(newUser.toObject());
});