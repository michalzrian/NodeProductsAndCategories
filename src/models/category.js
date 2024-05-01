// class category
// {
//     constructor(id,name)
//     {
//         this.id = id ;
//         this.name = name;
//     }

// }
// function save(categor) {
//     const c = new category(categor.id,categor.name);
//     console.log("category : " + c.name + " id : " + c.id);
//   }
// module.exports = save;

const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    id : String,
    name: String,
    category:String,
});

module.exports = mongoose.model('Category', categorySchema);
