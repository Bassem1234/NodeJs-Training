const express = require('express');
const router = express.Router();
const User = require('../models/userSchema');
const bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {
    try {
        console.log(req.body);
        const userFound = await User.findOne({ email: req.body.email});
        if(userFound) {
            res.send({message: 'email already exists, please choose another email'});
        }
        else {
            const hashedPwd = await bcrypt.hash(req.body.password, 10);
            const createdUser = await User.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                age: req.body.age,
                password: hashedPwd
            });
            res.json(createdUser);
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({message: 'Internal server error'});
    }
})


router.post('/login', async (req, res) => {
    try{
        const user = await User.findOne({email: req.body.email});
        if (user) {
            const cmp = await bcrypt.compare(req.body.password, user.password);
            if(cmp) {
                //.... further code to maintain authentification like jwt or sessions
                res.send({message: 'Auth Successful'});
            } 
            else {
                res.send({message: "Wrong email or password"});
            }
        }
        else {
            res.send({message: "Wrong email or password"});
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Internal server error occured");
    }
});

module.exports = router;