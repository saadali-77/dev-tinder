const express=require('express')
const userRouter= express.Router();
const connectionReq= require('../models/connectionReq')
const {Auth}= require('../middleware/auth')
userRouter.get('/user/requests',Auth,async(req,res)=>{
 const loginuser= req.user;
try{
 const connectionReqs= await connectionReq.find({
    touserid:loginuser._id,
    status:'interested'
   }).populate('fromuserid',['firstName','lastName'])
res.json({
  message:'data fetch successfull',
  data:connectionReqs
})
//connectionReq.save()
}catch(err){
  res.send('ERR'+err.message)
}
})
userRouter.get('/user/connections',Auth,async(req,res)=>{
  try{
    const loginuser= req.user;
    const connectionReqs= await connectionReq.find({
      $or:[
        {fromuserid:loginuser._id,status:'accepted'},
        {touserid:loginuser._id,status:'accepted'}
      ]
    }).populate('fromuserid',['firstName','lastName']).populate('touserid',['firstName','lastName'])
   const finaldata= connectionReqs.map(row=>{
    if(row.fromuserid._id.equals(row.touserid._id)){
      return row.fromuserid
    }
    return row.touserid;
   })//we use it to to avoid from touserid.
   res.json({
    data:finaldata
   })
  }
  catch(err){
    res.send('ERR' + err.message)
  }
})








module.exports=userRouter;