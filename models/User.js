let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let UserSchema = new Schema({
        username:  String,
        password: String,
        role: {type: String, default: 'user'}
       
    });
     let User = mongoose.model('User',UserSchema);
module.exports =  function() {
    return User;

};






