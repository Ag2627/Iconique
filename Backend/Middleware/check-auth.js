import jwt, { decode } from 'jsonwebtoken';
import dotenv from 'dotenv';
import Seller from '../Model/seller_schema.js';

dotenv.config(); // Make sure you load environment variables from .env


export const authenticateSeller = async (req, res, next) => {
  try {
    console.log('Middleware triggered'); // Log when the middleware is called

    // Extract token from the Authorization header

    const token = req.headers.authorization?.split(" ")[1];
    console.log("headers",req.headers.authorization);
    
    console.log('Token',token);
    
    if (!token) {
      return res.status(401).send({ error: 'Authorization token required.' });
    }

    // Verify token using JWT secret from the environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the seller by ID and ensure the token is valid (if you store tokens in the DB)
    const seller = await Seller.findOne({ _id: decoded.id, 'tokens.token': token });
    if (!seller) {
      throw new Error('Seller not found or token is invalid.');
    }

    // Attach the seller to the request object for later use
    req.seller = {id:decoded.id};
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate as a seller.' });
  }
};
