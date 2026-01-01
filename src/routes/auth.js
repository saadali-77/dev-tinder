const  express= require('express')
const authRouter= express.Router()

const bcrypt= require('bcrypt')

 const {signupvalidate}= require('../utils/validation')
 const User=  require('../models/user')

authRouter.post('/signup',async(req,res)=>{
  try{
  signupvalidate(req)
  const {password,firstName,lastName,email}= req.body
  const hashpassword= await bcrypt.hash(password,10)
  console.log(hashpassword)
  const user= new User({
    firstName,lastName,email,password:hashpassword
  })
   await user.save()
   res.send('user added successfully')
    }
    catch(err){
     res.send('Error:' + err.message)
    }
  })
 authRouter.post('/login',async(req,res)=>{
    try{
       const {email,password}= req.body;
      const user=  await User.findOne({email});
      if(!user){
        res.send('not found email in db')
      }
      const matchpassword=  bcrypt.compare(password, user.password)
     if(matchpassword){
      const token= await user.getjwt()
      //const token= await jwt.sign({_id:user._id},'pb652343')
      res.cookie('token',token,)
      res.send('login user sucessfull')
     }else{
      return res.send('enter correct password')
     }

    } catch(err){
      res.send('Error:' + err.message)
    }
  })
authRouter.post('/logout',(req,res)=>{
  res.cookie('token',null,{
    expires:new Date(Date.now())
  })
  res.send('you are logout')
})






module.exports= authRouter;