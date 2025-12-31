const express= require('express')
const requestRouter= express.Router();
const ConnectionReq= require('../models/connectionReq')
const {Auth} =require('../middleware/auth')
requestRouter.post('/request/send/:status/:touserid',Auth,async(req,res)=>{
  try{
    const fromuserid= req.user._id;
  const touserid= req.params.touserid;
  const status= req.params.status;
 const connectionReq= new ConnectionReq({
    touserid,fromuserid,status
  })
 const data=  await connectionReq.save()
  
  res.json({
    message:'data sent sucessfully',data
  })
}
  catch(err){
    res.send('errors + err.message')
  }
  
  res.send('data sent by'+ user.firstName )
})
module.exports= requestRouter