const express=require('express')
const userRouter= express.Router();
const connectionReq= require('../models/connectionReq')
const {Auth}= require('../middleware/auth');
const User = require('../models/user');
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
userRouter.get('/feed', Auth, async (req, res) => {
  try {
    const loginuser = req.user;
              const page = parseInt (req.query.page);
              const limit= parseInt (req.query.limit);
               const skip=(page-1)*limit

    const connectionReqs = await connectionReq.find({
      $or: [
        { fromuserid: loginuser._id },
        { touserid: loginuser._id }
      ]
    }).select('fromuserid touserid');
    const hideuser = new Set();

    connectionReqs.forEach((req) => {
      hideuser.add(req.fromuserid.toString());
      hideuser.add(req.touserid.toString());
    });

    const user = await User.find({
      _id: {
        $nin: Array.from(hideuser),
        $ne: loginuser._id
      }
    }).skip(skip).limit(limit)

    res.send(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
});


















module.exports=userRouter;