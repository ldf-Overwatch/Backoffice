let mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
// Paramètres de saisie automatique le user, passoword

passport.use(new LocalStrategy(
    function(username, password, done) {
        _db.User.findOne({
            username: username
        }, function(err, user) {
            if (err) {
                return done(err);
            }

            if (!user) {
                return done(null, false);
            }

            if (user.password !== password) {
                return done(null, false);
            }
            return done(null, user);
        });
    }
));

//authentifier erreur
exports.authenticate = passport.authenticate('local', { failureRedirect: '/error' });

//le chemin  'admin/index'
exports.login_success = function(req, res) {
    return res.redirect('admin/index');
};


exports.index = (req, res) => res.render('pages/auth.ejs', { root : __dirname}); // appler page  auth
exports.success = (req, res) => res.send("Welcome "+req.query.username+"!!"); // appeler  il est connecté
exports.error = (req, res) => res.send("error logging in"); // erreu
exports.test = (req, res) => res.render('pages/index.ejs', { root : __dirname}); //appeller la page index
