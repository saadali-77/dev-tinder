
import express from 'express'

const app = express()

app.get('/user', (req, res) => {
  res.send('Hello World express')
})
app.post('/user', (req, res) => {
  res.send('Hello World ')
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})