// class product 
// {
//     constructor(id,name,category)
//     {
//         this.id = id ;
//         this.name = name;
//     }

// }
// function save(prod)
// {
//     const p = new product(prod.id,prod.name,prod.category);
//     console.log("id : " + p.id + "name : " + p.name + "category : " + p.category);
// }
// module.exports = save;
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    category:String,
    name: String,
});

module.exports = mongoose.model('Product', productSchema);
