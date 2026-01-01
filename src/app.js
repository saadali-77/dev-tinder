
const express= require('express') 
const User=  require('./models/user')
//const bcrypt= require('bcrypt')
 const cookieparser=   require('cookie-parser')
 //const {signupvalidate}= require('./utils/validation')
 const connectDB=    require('./config/database')
 
 //const jwt= require('jsonwebtoken')
// const {Auth} =require('./middleware/auth')
const authRouter= require('./routes/auth')
const profileRouter= require('./routes/profile')
const requestRouter= require('./routes/request')
const userRouter= require('./routes/user')
const app = express()

 app.use(cookieparser())
 app.use(express.json())
 app.use('/',authRouter)
 app.use('/',profileRouter)
 app.use('/',requestRouter)
 app.use('/',userRouter)
//app.post('/signup',async(req,res)=>{
  //try{
  // signupvalidate(req)
  // const {password,firstName,lastName,email}= req.body
  // const hashpassword= await bcrypt.hash(password,10)
  // console.log(hashpassword)
  // const user= new User({
  //   firstName,lastName,email,password:hashpassword
  // })
  //  await user.save()
  //  res.send('user added successfully')
  //   }
  //   catch(err){
  //    res.send('Error:' + err.message)
  //   }
 // })
 // app.post('/login',async(req,res)=>{
    // try{
    //    const {email,password}= req.body;
    //   const user=  await User.findOne({email});
    //   if(!user){
    //     res.send('not found email in db')
    //   }
    //   const matchpassword=  bcrypt.compare(password, user.password)
    //  if(matchpassword){
    //   const token= await user.getjwt()
    //   //const token= await jwt.sign({_id:user._id},'pb652343')
    //   res.cookie('token',token,)
    //   res.send('login user sucessfull')
    //  }else{
    //   return res.send('enter correct password')
    //  }

    // } catch(err){
    //   res.send('Error:' + err.message)
    // }
  //})
//app.get('/profile',Auth,async(req,res)=>{
     // const cookies= req.cookies;
     // const {token}= cookies
       //  const message= jwt.verify(token,'pb652343')
       //  const {_id}= message;
        // const user=await  User.findById(_id)
        //const user= req.user;
        // if(user){
          // res.send(user)
         
        // }
         //else{
          //res.send('got some error message')
        // }
         //console.log(_id)
        // console.log(user)
//})
//app.post('/sendconnection',Auth,(req,res)=>{
 // const user= req.user
  
 // res.send('data sent by'+ user.firstName )
//})
app.patch('/signup/:userid',async(req,res)=>{
  const userid= req.params?.userid;
  const data=req.body;
  try{
    const updateuser=['firstName','lastName','password','skill','gender']
    const isupdated= Object.keys(data).every(k=> updateuser.includes(k))
    console.log(isupdated)
    if(!isupdated){
      throw new Error('cannot update this field')
    }
    if(data?.skill.length>10){
      throw new Error('cannot set skills more than 10')
    }
    const users= await User.findByIdAndUpdate({_id:userid},data,{returnDocument:"before"})
   
   
   console.log(users)
   res.send('user updated successful')
  } 
 catch(err){
  res.send('got some error')
 }

})
 

app.post('/signup',async(req,res)=>{
 
   const user= new User(req.body)
  const data= await user.save()
   res.send('user added successfully' + data)
    })
   
    




connectDB().then(()=>{
  console.log('database is connected sucessfull')
}).catch((err)=>{
  console.log('database is not connectedd')
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})