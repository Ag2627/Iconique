import jwt from 'jsonwebtoken';
const JWT_SECRET = 'This is token'
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
