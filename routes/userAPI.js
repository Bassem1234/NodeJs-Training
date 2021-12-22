const express = require('express');
const router = express.Router();
//require model
const User = require('../models/userSchema');


//get all users
router.get('/users', async(req,res) => {
    try {
     const users = await User.find({});
     res.json(users);
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: 'Internal server error'});
    }
})

//get one user by id
router.get('/users/:id', async(req,res) => {
    const user = await User.findById(req.params.id);
    res.json(user);
})

//add one user
router.post('/users', async(req,res) => {
    const createdUser = await User.create(req.body)
    res.json(createdUser);
})

//update a user by id
router.put('/users/:id', async(req, res) => {
    const userToUpdate = await User.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.json(userToUpdate);
})

//delet a user
router.delete('/users/:id', async(req, res) => {
    const userToDelete = await User.findByIdAndRemove(req.params.id)
    res.json({message:'user deleted successfully'});
})

module.exports =  router;