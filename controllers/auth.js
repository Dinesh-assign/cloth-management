const User=require('../models/user');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
exports.postSignup=(req,res,next)=>{
    console.log("running");
    const name=req.body.name;
    const email=req.body.email;
    const password=req.body.password;
    const role=req.body.role;
    console.log(req.body);
    User.findOne({email:email})
      .then(userDoc=>{
        if(userDoc){
          return res.redirect('/signup');
        }
        return bcrypt.hash(password,12).then(hashedPassword=>{
                const user=new User({
                  name:name,
                  email:email,
                  password:hashedPassword,
                  role:role
                })
                return user.save();
            })
            .then(result=>{
              return res.status(200).json({message:"Registered Successfully",data:result});
            })
            .catch(err=>{
              console.log(err);
            })
        })
      .catch(err=>{
        console.log(err);
      });
  };

exports.postLogin = (req, res, next) => {
  const email=req.body.email;
  const password=req.body.password;
  var user;
  User.findOne({email:email})
    .then(result=>{
      user=result;
      console.log(user);
      if(user){
        return bcrypt.compare(req.body.password,result.password);
      }
      else{
        return res.status(404).json({message:"Incorrect Email or Password"});
      }
    })
    .then(doMatch=>{
      if(!doMatch){
        return res.status(404).json({message:"Incorrect Email or Password"});
      }
      const token=jwt.sign({_id:user._id,role:user.role},"token");
      console.log(token);
      return res.status(200).header("auth-token",token).json({message:"Logged In Successfully",data:token});
    })
    .catch(err=>{
        console.log(err);
        return res.status(404).json({message:"something wrong is going on"});
    });
};

exports.getHome=(req,res,next)=>{
  const token=req.header("auth-token");
  try{
    const verified=jwt.verify(token,"token");
    req.user=verified;
    console.log(verified);
  }
  catch{
    res.status(400).json({message:"Invalid token"});
  }
  return res.status(200).json({data:req.user});
}




  