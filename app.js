
const express = require('express');
const app = express();
const port = 3000;
const routes = require('./src/controller/ProductsAndCategoriesController');
const usersController = require('./src/controller/UserController');
const cors = require('cors');
const path = require('path');

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api', routes);
app.use('/users', usersController);

app.use(function(req, res, next) {
    console.log('entered  in ' + Date.now() + ' in url ' + req.url);
    next();
});

app.use(function(req, res, next) {
    if ((req.method === 'PUT' || req.method === 'POST') && req.body === null) {
        console.log('ERROR!')
        return next('app');
    }
    next();
});

// Authorization middleware
app.use((req, res, next) => {
    let token = req.header('Authorization')
    if (!token) {
        return res.status(401).send('Access Denied')
    }
    next()
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

const mongoose = require('mongoose');

// התחברות למסד נתונים
mongoose.connect('mongodb://localhost:27017/ProductsDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));


