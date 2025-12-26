const mongoose = require("mongoose");

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
  trim:true
  },
  password:{
    type:String
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
const User= mongoose.model('user',userSchema)
module.exports=User;