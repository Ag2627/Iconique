import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import Seller from 'Backend/Model/seller_schema';
module.exports = (req,res,next)=>{
  try{
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    const verify = jwt.verify(token,JWT_SECRET);
    if(verify)
    {
      next();
    }
    else{
      return res.status(401).json({
        msg:'not a valid type of user'
      })
    }
  }
  catch(error)
  {
    return res.status(401).json({
      msg:'invalid token'
    })
  }
}

const authenticateSeller = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const seller = await Seller.findOne({ _id: decoded.id, 'tokens.token': token });
    if (!seller) throw new Error();
    req.seller = seller;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate as seller.' });
  }
};

module.exports = authenticateSeller;