
const router = require("express").Router(); 
const fs = require('fs').promises
const bcrypt = require('bcrypt');
const path = require('path');
const User = require('../models/user'); 
const jwt = require('jsonwebtoken');
const { config } = require('process');
const secretKey = "?????";
const tokenSecret = process.env.TOKEN_SECRET;

router.post('/signup', async (req, res) => {
    try {
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            id: req.body.id,
            username: req.body.username,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).send('User added successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error adding user');
    }
});

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });

        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        const validPassword = bcrypt.compare(req.body.password, user.password);

        if (!validPassword) {
            return res.status(401).send({ message: 'Invalid password' });
        }

        const token = jwt.sign({ id: user.id, username: user.username }, secretKey);

        res.header("auth-token", token).send({ token });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error logging in');
    }
});
module.exports = router
