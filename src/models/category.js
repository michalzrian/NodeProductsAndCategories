
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    id : String,
    name: String,
    category:String,
});

module.exports = mongoose.model('Category', categorySchema);
