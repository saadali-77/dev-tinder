const mongoose = require("mongoose");
        const validator = require('validator');
        const jwt= require('jsonwebtoken')
const userSchema= new mongoose.Schema({
  firstName:{
    type:String,
    required:true,
    minLength:4,
    maxLength:20
  },
  lastName:{
    type:String
  },
  email:{
  type:String,
  unique:true,
  lowercase:true,
  trim:true,
  validate(value){
    if(!validator.isEmail(value)){
      throw new Error('cannot verify your email' + value)
    }
  }},
  password:{
    type:String,
validate(value){
    if(!validator.isStrongPassword(value)){
      throw new Error('put strong password instead' + value)
    }
  }


  },
  gender:{
    type:String,
    validate(value){
      if(!['male','female'].includes(value)){
        throw new Error('please select correct genders')
      } 
    }

  },
  age:{
    type:Number,
    min:18
  },
  about:{
    type:String,
    default:'i am software enginer'
  },
  skill:{
    type:[String]
  }
},{timestamps:true})
userSchema.methods.getjwt= async function (){
  const user= this;
   const token= await jwt.sign({_id:user._id},'pb652343')
   return token;
}
const User= mongoose.model('user',userSchema)
module.exports=User;