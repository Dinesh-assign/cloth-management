const Cloth=require('../models/cloth');
const User = require('../models/user');
var fs = require('fs');
var path=require('path');
const mongoose=require('mongoose');
exports.postAddCloth=(req,res,next)=>{
    if(req.user.role==="admin"){
        const name=req.body.name;
        const price=req.body.price;
        const description=req.body.description;
        const quantity=req.body.quantity;
        const size=req.body.size;
        const img= {
            data: fs.readFileSync(path.join(__dirname +'/../'+ '/images/' + req.file.filename)),
            contentType: 'image/png'
        }
        fs.unlinkSync(path.join(__dirname +'/../'+ '/images/' + req.file.filename));
        const cloth=new Cloth({
            name:name,
            price:price,
            description:description,
            quantity:quantity,
            size:size,
            image:img
          })
          cloth.save().then(result=>{
              res.status(200).json({message:"Cloth Added Successfully",data:result});
          }).catch(err=>{
            res.status(500).json({message:"Internal Server Error"});
          });
    }
    else{
        res.status(403).json({message:"Forbidden"});
    }
}

exports.putUpdateCloth=async (req,res,next)=>{
    if(req.user.role==="admin"){
        const id=req.body.id;
        const cloth=await Cloth.findOne({_id:id}).then(result=>{
            if(!result){
                res.status(400).json({message:"Cloth is not exists"})
            }
            return result;
        }).catch(err=>{
            res.status(500).json({message:"Internal Server Error"});
        })
        const img= {
            data: fs.readFileSync(path.join(__dirname +'/../'+ '/images/' + req.file.filename)),
            contentType: 'image/png'
        }
        fs.unlinkSync(path.join(__dirname +'/../'+ '/images/' + req.file.filename));
        Cloth.updateOne({_id:id},{$set:{
            name:req.body.name,
            price:req.body.price,
            description:req.body.description,
            size:req.body.size,
            quantity:req.body.quantity,
            image:img
        }}).then(result=>{
            res.status(200).json({message:"updated successfully"});
        }).catch(err=>{
            res.status(500).json({message:"Internal Server Error"});
        })
    }
    else{
        res.status(403).json({message:"Forbidden"});
    }
}

exports.deleteCloth=async(req,res,next)=>{
    if(req.user.role=="admin"){
        const id=req.body.id;
        Cloth.deleteOne({_id:id}).then(result=>{
            res.status(200).json({message:"Deleted Successfully"});
        }).catch(err=>{
            res.status(500).json({message:"Internal Server Error"});
        })
    }
    else{
        res.status(403).json({message:"Forbidden"});
    }
}

exports.postShareCloth=async (req,res,next)=>{
    if(req.user.role==="admin"){
        const email=req.body.email;
        //Cloth Searching
        const cloth=await Cloth.findOne({_id:mongoose.Types.ObjectId(req.body.id)}).then(cloth=>{
            if(!cloth){
                res.status(400).json({message:"Cloth is not exists"});
            }
            return cloth;
        }).catch(err=>{
            res.status(500).json({message:"Internal Server Error"});
        });
        //Customer Searching
        const user=await User.findOne({email:email}).then(user=>{
            if(!user){
                res.status(400).json({message:"Please Enter Correct Email Id of Customer"})
            }
            return user;
        }).catch(err=>{
            res.status(400).json({message:"Internal Server Error"});
        })
        //Share Cloth to Customer
        var sharedCloths=[];
        console.log(user);
        if(user.sharedCloths)
             sharedCloths=[...user.sharedCloths];

        sharedCloths.push(cloth);
        //Update in Database
        User.updateOne({email:email},{$set:{sharedCloths:sharedCloths}}).then(result=>{
            res.status(200).json({message:result});
        }).catch(err=>{
            res.status(500).json({message:"Internal Server Error"});
        })
    }
    else{
        res.status(403).json({message:"Forbidden"});
    }
}

exports.getAllCloths=(req,res,next)=>{
    if(req.user.role==="admin"){
        Cloth.find().then(result=>{
            res.status(200).json({data:result});
        }).catch(err=>{
            res.status(500).json({message:"Internal Server Error"});
        })
    }
    else{
        res.status(403).json({message:"Forbidden"});
    }
}
