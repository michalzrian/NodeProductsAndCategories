
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    category:String,
    name: String,
});

module.exports = mongoose.model('Product', productSchema);
