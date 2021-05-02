require('dotenv/config');
const express=require('express');
const bodyParser=require('body-parser');
const authRoutes=require('./routes/auth');
const adminRoutes=require('./routes/admin');
const customerRoutes=require('./routes/customer');
const cors=require('cors');
const mongoose=require('mongoose');
const multer=require('multer');
const MONGODB_URI=process.env.MONGO_URI;

const app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

const fileStorage=multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,'images');
  },
  filename:(req,file,cb)=>{
    req.filename=Date.now()+'-'+file.originalname;
    cb(null,Date.now()+'-'+file.originalname);
  }
});


const fileFilter=(req,file,cb)=>{
  if(file.mimetype==='images/png'||file.mimetype==='image/jpg'||file.mimetype==='image/jpeg'){
    cb(null,true);
  }
  cb(null,false);
};

app.use(multer({storage:fileStorage,fileFilter:fileFilter}).single('image'));

app.use(authRoutes);
app.use('/admin',adminRoutes);
app.use('/customer',customerRoutes);

mongoose
  .connect(
    MONGODB_URI
  )
  .then(result=>{
    app.listen(process.env.PORT || 5000);
    console.log("server start listening on port 3000");
  })
  .catch(err=>{
    console.log(err);
  });
