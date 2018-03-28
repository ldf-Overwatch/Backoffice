
let express = require('express'), load = require('express-load');
let cookieSession = require('cookie-session');
let mongoose = require('mongoose');
let ejs = require('ejs');
let app = express();
let bodyParser = require('body-parser');
const passport = require('passport');

app.set('trust proxy', 1); // trust first proxy

app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2']
}));


app.use(passport.initialize()); //initialise passport
app.use(passport.session()); //utilisation des sessions(cookies)

passport.serializeUser(function(user, cb) { //encoder un user id et l'envoyer au browser(google chrome par exemple)
    cb(null, user._id);
});

passport.deserializeUser(function(id, cb) { //decoder le user id et faire un find de cet id en base user pour savoir
    // qu'il est authentifier.
    _db.User.findById(id, function (err, user) {
        cb(null, user);
    });
});


app.use(bodyParser.urlencoded({ extended: true })); // change les fichier

load('db')
    .then('models')
    .then('lib/auth.js')
    .into(app);

load('controllers')
    .then('routes')
    .into(app);

app.set('view engine', 'ejs' );


global._db = app.models;

app.use('/static', express.static('public'));

app.listen(8080);



