const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const clothSchema=new Schema({
  name:{
    type:String,
    required:true
  },
  price:{
    type:String,
    required:true
  },
  image:{
    data:Buffer,
    contentType:String
  },
  description:{
    type:String,
    required:false
  },
  quantity:{
      type:Number,
      required:true
  },
  size:{
      type:String,
      required:true
  }
});

module.exports=mongoose.model('Cloth',clothSchema);
