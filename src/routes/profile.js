const express= require('express')
const profileRouter= express.Router();
const {Auth} =require('../middleware/auth')
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
         console.log(_id)
         console.log(user)
})


module.exports= profileRouter;