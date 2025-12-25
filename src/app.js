
const express= require('express') 
const User=  require('./models/user')
 const connectDB=    require('./config/database')
const app = express()
app.use(express.json())
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