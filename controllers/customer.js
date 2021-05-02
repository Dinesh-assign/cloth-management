const Cloth=require('../models/cloth');
const User = require('../models/user');

exports.getSharedCloths=async (req,res,next)=>{
    if(req.user.role=="customer"){
        userData=await User.findOne({_id:req.user._id}).populate('sharedCloths').exec((err,doc)=>{
            res.status(200).json({data:doc.sharedCloths});
        }).catch(err=>{
            res.status(400).json({message:err.data});
        })
    }
    else{
        res.status(400).json({message:"permission denied"});
    }
}
