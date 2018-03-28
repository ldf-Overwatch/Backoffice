let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let NewSchema = new Schema({
    titre:  String,
    actualite: String,
    datecreation: String
});

let New = mongoose.model('new', NewSchema );

module.exports =  function() {
    return New;
};