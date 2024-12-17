import { verifyToken } from "../utils/jwt.js";
import jwt from 'jsonwebtoken';
import Seller from '../Model/seller_schema.js';

export const authenticateSeller = async (req, res, next) => {
  try {
    // Get token from Authorization header
    const token = req.headers.authorization?.split(" ")[1];  // Get token from 'Bearer token'

    if (!token) {
      return res.status(401).json({ error: 'Authorization token required.' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the seller using the decoded ID
    const seller = await Seller.findOne({ _id: decoded.id });
    if (!seller) {
      return res.status(401).json({ error: 'Seller not found or token is invalid.' });
    }

    // Attach the seller's ID to the request object for further use
    req.seller = { id: decoded.id };
    
    next();  // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(401).json({ error: 'Please authenticate as a seller.' });
  }
};

export const authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Authorization token is required." });
    }

    const decoded = verifyToken(token);
    req.user = decoded; // Attach decoded token to request
    next();
  } catch (error) {
    res.status(401).json({ message: "Authentication failed." });
  }
};
