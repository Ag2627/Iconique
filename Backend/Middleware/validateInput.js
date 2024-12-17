import { body, validationResult } from "express-validator";

// Validation Rules
export const validateSignup = [
  body("email").isEmail().withMessage("Please provide a valid email."),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters."),
  body("name").notEmpty().withMessage("Name is required."),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validateLogin = [
  body("email").isEmail().withMessage("Please provide a valid email."),
  body("password").notEmpty().withMessage("Password is required."),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
