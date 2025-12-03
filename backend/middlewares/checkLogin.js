
const jwt= require('jsonwebtoken');
require('dotenv').config();

const checkLogin= async(req, res, next)=>{
    try{
        const token= req.cookies.token || req.headers.authorization;
    if(!token){
        return res.status(401).send({message:'Unauthorized access'});
    }

    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user=verifyToken;
    next();

    }
    catch(err){
        res.status(401).send({message:'Invalid or expired token'})
    }
    
}

module.exports=checkLogin;