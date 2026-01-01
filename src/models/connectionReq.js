const mongoose= require('mongoose')
const { schema } = require('./user')
const connectionReq= new mongoose.Schema({
  fromuserid:{
    type:mongoose.Schema.Types.ObjectId,
    require:true,
    ref:'user'
  },
  touserid:{
    type:mongoose.Schema.Types.ObjectId,
    require:true,
    ref:'user'
  },
  status:{
    type:String,
     require:true,
    enum:{
     values:["accepted","rejected","ignored","interested"], 
     message:`{values} is not include`
    }
  }
  
},{timestamps:true})
const ConnectionReqModel= new mongoose.model('connectionReq',connectionReq)
module.exports= ConnectionReqModel;