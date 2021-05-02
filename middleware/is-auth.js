const jwt=require('jsonwebtoken');
module.exports=(req,res,next)=>{
    const token=req.header("auth-token");
    console.log(token);
    try{
        const verified=jwt.verify(token,"token");
        req.user=verified;
        console.log(verified);
    }
    catch{
        res.status(400).json({message:"Invalid token"});
    }
    next();
}  