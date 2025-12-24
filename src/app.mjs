
import express from "express"
import { Auth } from "./middleware/auth.mjs"
const app = express()
app.use('/admin',Auth)

app.get('/admin',(req,res)=>{
  res.send('get admin')
})

app.get('/admin/getall',(req,res)=>{
  res.send('get all data')
})
app.get('/admin/delete',(req,res)=>{
  res.send('delete the user')
})
//app.post('/user', (req, res) => {
 // res.send('Hello World ')
//})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})