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
              return res.status(500).json({message:"Internal Server Error"});
            })
        })
      .catch(err=>{
        console.log(err);
        return res.status(500).json({message:"Internal Server Error"});
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
        res.status(404).json({message:"Incorrect Email or Password"});
      }
    })
    .then(doMatch=>{
      if(!doMatch){
        return res.status(400).json({message:"Incorrect Email or Password"});
      }
      const token=jwt.sign({_id:user._id,role:user.role},"token");
      console.log(token);
      res.status(200).header("auth-token",token).json({message:"Logged In Successfully",data:token});
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({message:"Internal Server Error"});
    });
};





  