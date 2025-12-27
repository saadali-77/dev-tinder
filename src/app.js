
const express= require('express') 
const User=  require('./models/user')
 const connectDB=    require('./config/database')
const app = express()
app.use(express.json())
app.post('/signup',async(req,res)=>{
  const userobj={
    firstName:'jackyy',
    lastName:'micely',
    email:'saadali@gmail.com',
    password:'Saad5912@',
    gender:'male'
  } 
  const user= new User(userobj)
   await user.save()
   res.send('user added successfully')
    })

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