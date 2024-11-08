import { body, validationResult, ValidationChain } from "express-validator";
import { Request, Response, NextFunction } from "express";

const handleValidationErrors = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

export const validateUserRequest: (ValidationChain | ((req: Request, res: Response, next: NextFunction) => Promise<void>))[] = [
    body("name").isString().notEmpty().withMessage("Name must be a string"),
    body("addressLine").isString().notEmpty().withMessage("Address Line must be a string"),
    body("country").isString().notEmpty().withMessage("Country must be a string"),
    body("city").isString().notEmpty().withMessage("City must be a string"),
    handleValidationErrors,
];