const express = require('express')
var morgan = require('morgan')
const app = express()
const port = 3000
//morgan Config
app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.json({message:'Hello World world!'})
})

//get all users
app.get('/users', (req,res) => {
    res.json({message:'all users'});
})

//get one user by id
app.get('/users/:id', (req,res) => {
    res.json({message:'get one user by his id'});
})

//add one user
app.post('/users', (req,res) => {
    res.json({message:'user added successfully'});
})

//update a user by id
app.put('/users/:id', (req, res) => {
    res.json({message:'update user by his id'});
})

//delet a user
app.delete('/users/:id', (req, res) => {
    res.json({message:'user deleted successfully'});
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})