
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: String,
    password: String,
    username: String,
});

module.exports = mongoose.model('User', userSchema);
