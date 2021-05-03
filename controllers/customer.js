const Cloth=require('../models/cloth');
const User = require('../models/user');

exports.getSharedCloths=async (req,res,next)=>{
    if(req.user.role=="customer"){
        userData=await User.findOne({_id:req.user._id}).populate('sharedCloths').exec((err,doc)=>{
            if(err){
                res.status(500).json({message:"Internal Server Error"});
            }
            res.status(200).json({data:doc.sharedCloths});
        })
    }
    else{
        res.status(403).json({message:"Forbidden"});
    }
}
