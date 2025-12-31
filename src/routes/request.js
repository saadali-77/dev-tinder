const express= require('express')
const requestRouter= express.Router();
const ConnectionReq= require('../models/connectionReq')
const User= require('../models/user')
const {Auth} =require('../middleware/auth')
requestRouter.post('/request/send/:status/:touserid',Auth,async(req,res)=>{
  try{
    const fromuserid= req.user._id;
  const touserid= req.params.touserid;
  const status= req.params.status;
const matchstatus= ['interested','ignored']
   if(!matchstatus.includes(status)){
     return res.send(`did not found status in db `)
   }
    const Touserid=await User.findById(touserid)
   if(!Touserid){
    res.send('user  not found ')
   }
if(fromuserid.equals(touserid)){
  res.send('cannont send request to yourself')
}

const existingReq= await ConnectionReq.findOne({
  $or:[
    {fromuserid,touserid},
    {fromuserid:touserid,touserid:fromuserid}
  ]
})
if(existingReq){
  res.send('already exist connection request in db')
}


 const connectionReq= new ConnectionReq({
    touserid,fromuserid,status
  })
 const data=  await connectionReq.save()
  
  res.json({
    message:req.user.firstName + " is " + status + " in " +Touserid.firstName , data
  })
}
  catch(err){
    res.send('errors + err.message')
  }
  
  res.send('data sent by'+ User.firstName )
})
module.exports= requestRouter