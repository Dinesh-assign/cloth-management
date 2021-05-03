const Cloth=require('../models/cloth');
const User = require('../models/user');
var fs = require('fs');
var path=require('path');
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
              res.status(202).json({message:"Cloth Added Successfully",data:result});
          }).catch(err=>{
            res.status(400).json({message:err});
          });
    }
    else{
        res.status(404).json({message:"permission denied"});
    }
}

exports.postUpdateCloth=async (req,res,next)=>{
    if(req.user.role==="admin"){
        const id=req.body.id;
        const cloth=await Cloth.findOne({_id:id}).then(result=>{
            if(!result){
                res.status(400).json({message:"Cloth is not exists"})
            }
            return result;
        }).catch(err=>{
            res.status(404).json({message:err.data});
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
            console.log(result);
            res.status(200).json({message:"updated successfully"});
        }).catch(err=>{
            res.status(404).json({message:err.data});
        })
    }
    else{
        res.status(404).json({message:"permisssion denied"});
    }
}

exports.postDeleteCloth=async(req,res,next)=>{
    if(req.user.role=="admin"){
        const id=req.body.id;
        Cloth.deleteOne({_id:id}).then(result=>{
            res.status(200).json({message:"Deleted Successfully"});
        }).catch(err=>{
            res.status(404).json({message:err.data});
        })
    }
    else{
        res.status(404).json({message:"permission denied"});
    }
}

exports.postShareCloth=async (req,res,next)=>{
    if(req.user.role==="admin"){
        const id=req.body.id;
        const email=req.body.email;
        //Cloth Searching
        const cloth=await Cloth.findOne({_id:mongoose.Types.ObjectId(id)}).then(cloth=>{
            if(!cloth){
                res.status(400).json({message:"Cloth is not exists"});
            }
            console.log(cloth);
            return cloth;
        }).catch(err=>{
            console.log(err);
            res.status(400).json({message:err.data});
        });
        //Customer Searching
        const user=await User.findOne({email:email}).then(user=>{
            if(!user){
                res.status(400).json({message:"Please Enter Correct Email Id of Customer"})
            }
            console.log(user);
            return user;
        }).catch(err=>{
            console.log(err);
            res.status(400).json({message:err.data});
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
            console.log(err);
            res.status(400).json({message:err.data});
        })
    }
    else{
        res.status(404).json({message:"permission denied"});
    }
}

exports.getAllCloths=(req,res,next)=>{
    if(req.user.role==="admin"){
        Cloth.find().then(result=>{
            res.status(200).json({data:result});
        }).catch(err=>{
            res.status(400).json({message:err.data});
        })
    }
    else{
        res.status(404).json({message:"permission denied"});
    }
}
