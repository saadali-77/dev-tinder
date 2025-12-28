const validator =require('validator')
const signupvalidate=(req)=>{
  const {firstName,lastName,email,password}= req.body;
  if(!firstName || !lastName){
    throw new Error('kindly correct your name')
  }
  else if (!validator.isEmail(email)){
   throw new Error('please check your email id')
  } 
  else if(!validator.isStrongPassword(password)){
    throw new Error('please enter strong password')

    
  }
}
module.exports = { signupvalidate }
