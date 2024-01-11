const jwt=require('jsonwebtoken');
const user=require('../modals/userModel');
const asynchandler=require('express-async-handler');

const protect=asynchandler(async(req,res,next)=>{
     let token;
    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ){
        try{
         token=req.headers.authorization.split(" ")[1];
         const decoded=jwt.verify(token,process.env.JWT_SECRET);
         req.user=await user.findById(decoded.id).select('-password');
         next();
        }catch(error){
           res.status(401);
           throw new Error("User authorized,token failed");
        }
    }
    if(!token){
        res.status(401);
        throw new Error("User authorized,no token");
    }
})

module.exports={protect};