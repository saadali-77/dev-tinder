const express= require('express')
const requestRouter= express.Router();
const {Auth} =require('../middleware/auth')
requestRouter.post('/sendconnection',Auth,(req,res)=>{
  const user= req.user
  
  res.send('data sent by'+ user.firstName )
})
module.exports= requestRouter