
const express= require('express') 
const User=  require('./models/user')
 const connectDB=    require('./config/database')
const app = express()
app.use(express.json())
app.post('/signup',async(req,res)=>{
  const userobj={
    firstName:'saad',
    lastName:'ali',
    email:'bilal1243@gmail.com',
    password:'1122',
    gender:'male'
  } 
  const user= new User(userobj)
   await user.save()
   res.send('user added successfully')
    })

app.patch('/signup',async(req,res)=>{
  const userid= req.body.userid;
  const data=req.body;
  try{//delete user by id
    const users= await User.findByIdAndUpdate({_id:userid},data,{returnDocument:"before"})
   // const user  = await User.find({email:useremail})
   
   console.log(users)
   res.send('user updated successful')
  } 
 catch(err){
  res.send('got some error')
 }

})
 

app.post('/signup',async(req,res)=>{
 
   const user= new User(req.body)
   await user.save()
   res.send('user added successfully')
    })
   
    




connectDB().then(()=>{
  console.log('database is connected sucessfull')
}).catch((err)=>{
  console.log('database is not connectedd')
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})