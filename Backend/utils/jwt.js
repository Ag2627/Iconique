import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in the environment variables.");
}

// Generate Token
export const generateToken = (id, email) => {
  return jwt.sign({ id, email }, JWT_SECRET, { expiresIn: "1h" });
};

// Verify Token
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error("Invalid or expired token.");
  }
};
