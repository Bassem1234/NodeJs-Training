const express = require('express');
const router = express.Router();
//require model
const User = require('../models/userSchema');


//get all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

//get one user by id
router.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

//add one user
router.post('/users', async (req, res) => {
    try{
    const createdUser = await User.create(req.body)
    res.json(createdUser);
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: 'Internal server error'});
    }
});

//update a user by id
router.put('/users/:id', async (req, res) => {
    try{
    const userToUpdate = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(userToUpdate);
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: 'Internal server error'});
    }
});

//delete a user
router.delete('/users/:id', async (req, res) => {
    try{
    const userToDelete = await User.findByIdAndRemove(req.params.id)
    res.json({ message: 'user deleted successfully' });
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: 'Internal server error'});
    }
})

//affect toDo to user
router.put('/users/affect/:idUser/:idToDo', async (req, res) => {
    try{
    const userToUpdate = await User.findByIdAndUpdate(req.params.idUser, {$push: {todos: req.params.idToDo}}, { new: true })
    res.json(userToUpdate);
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: 'Internal server error'});
    }
});


//desaffect toDo
router.put('/users/desaffect/:idUser/:idToDo', async (req, res) => {
    try{
    const userToUpdate = await User.findByIdAndUpdate(req.params.idUser, {$pull: {todos: req.params.idToDo}}, { new: true })
    res.json(userToUpdate);
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: 'Internal server error'});
    }
});



//get all users with todos
router.get('/users-with-todos', async (req, res) => {
    try {
        const users = await User.find({}).populate('todos', 'name -_id createdAt');
        res.json(users);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});




module.exports = router;