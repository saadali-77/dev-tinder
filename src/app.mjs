
import express from 'express'

const app = express()

app.use('/user', (req, res,next) => {
  res.send('Hello World express')
  next()
},(req,res)=>{
res.send('welcome to second')
})
//app.post('/user', (req, res) => {
 // res.send('Hello World ')
//})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})