import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import User from "../models/userModel";

// Custom interface for authenticated requests
interface AuthRequest extends Request {
    userId?: string;
}

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

// Update user
export const updateUser = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
    const { name, addressLine, country, city } = req.body;
    
    if (!req.userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    const user = await User.findById(req.userId);

    if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
    }

    // Update user fields
    user.name = name || user.name;
    user.addressLine = addressLine || user.addressLine;
    user.country = country || user.country;
    user.city = city || user.city;

    // Save the updated user
    const updatedUser = await user.save();

    res.status(200).json(updatedUser.toObject());
});
