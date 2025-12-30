const express= require('express')
const profileRouter= express.Router();
const {Auth} =require('../middleware/auth')
const {validateprofile}= require('../utils/validation')
profileRouter.get('/profile',Auth,async(req,res)=>{
     // const cookies= req.cookies;
     // const {token}= cookies
       //  const message= jwt.verify(token,'pb652343')
       //  const {_id}= message;
        // const user=await  User.findById(_id)
        const user= req.user;
         if(user){
           res.send(user)
         
         }
         else{
          res.send('got some error message')
         }
         
         console.log(user)
})
profileRouter.patch('/profile/view',Auth,async(req,res)=>{
  try{
 if(!validateprofile(req)){
  throw new Error('invalid request')
 }
 const user= req.user
 Object.keys(req.body).forEach(key=>user[key]=req.body[key])
 res.json({message:`${user.firstName} updated the profile`,
         data:user
})
 await user.save()
 console.log(user)
  }catch(err){
 res.send(err.message)
  }
})

module.exports= profileRouter;