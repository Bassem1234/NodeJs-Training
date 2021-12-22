const express = require('express')
var morgan = require('morgan')
const app = express()
const port = 3000;

//database connection
require('./database/connect');

const User = require('./models/userSchema')

//config body parser

app.use(express.json())

//morgan Config
app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.json({message:'Hello World !'})
})

//get all users
app.get('/users', async(req,res) => {
    const users = await User.find({});
     res.json(users);
})

//get one user by id
app.get('/users/:id', async(req,res) => {
    const user = await User.findById(req.params.id);
    res.json(user);
})

//add one user
app.post('/users', async(req,res) => {
    const createdUser = await User.create(req.body)
    res.json(createdUser);
})

//update a user by id
app.put('/users/:id', async(req, res) => {
    const userToUpdate = await User.findByIdAndUpdate(req.params.id, req.body)
    res.json(userToUpdate);
})

//delet a user
app.delete('/users/:id', async(req, res) => {
    const userToDelete = await User.findByIdAndRemove(req.params.id)
    res.json({message:'user deleted successfully'});
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})