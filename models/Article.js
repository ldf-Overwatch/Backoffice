let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ArticleSchema = new Schema({
    titre:  String,
    auteur: String,
    chapeau: String,
    description1 : String,


});
let Article = mongoose.model('article',ArticleSchema);
module.exports =  function() {
    return Article ;
};