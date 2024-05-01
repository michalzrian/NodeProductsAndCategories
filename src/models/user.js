// class User {
    
//     constructor(id, password, username)
//     {
//         this.id = id;
//         this.password = password;
//         this.username = username;
//     }
// }
// module.exports = User;
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: String,
    password: String,
    username: String,
});

module.exports = mongoose.model('User', userSchema);
