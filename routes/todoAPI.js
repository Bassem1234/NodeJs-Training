const express = require('express');
const router = express.Router();
const User = require('../models/userSchema');
const todos = require('../models/todoSchema');
const passport = require('passport');


//get all todos
router.get('/todos', passport.authenticate('bearer', {session: false}) ,async (req, res) => {
    try {
        const todo = await todos.find({});
        res.json(todo);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

//get one toDo by id
router.get('/todos/:id', passport.authenticate('bearer', {session: false}), async (req, res) => {
    try {
        const todo = await todos.findById(req.params.id);
        res.json(todo);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

//add one todo
router.post('/todos', passport.authenticate('bearer', {session: false}) ,async (req, res) => {
    try{
    const createdTodo = await todos.create(req.body);
    // affect todo to connected user
    await User.findByIdAndUpdate(req.user._id, {$push: {todos: createdTodo._id}}, {new: true});
    res.json(createdTodo);
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: 'Internal server error'});
    }
});

//update a todo by id
router.put('/todos/:id', passport.authenticate('bearer', {session: false}), async (req, res) => {
    try{
    const todoToUpdate = await todos.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(todoToUpdate);
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: 'Internal server error'});
    }
});

//delete a todo
router.delete('/users/:id',passport.authenticate('bearer', {session: false}),  async (req, res) => {
    try{
    const todoToDelete = await todos.findByIdAndRemove(req.params.id)
    res.json({ message: 'todos deleted successfully' });
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: 'Internal server error'});
    }
})

module.exports = router;