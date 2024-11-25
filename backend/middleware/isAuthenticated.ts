import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

declare global {
  namespace Express {
    interface Request {
      id: string;
    }
  }
}

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }
    // Verify token
    const decoded = jwt.verify(token, process.env.SECRET_KEY as string) as jwt.JwtPayload;

    // Check if decoding was successful
    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    req.id = decoded.userId as string; // Ensure userId is a string
    next();
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};