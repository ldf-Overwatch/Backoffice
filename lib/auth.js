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


// permettant de gérer l’authentification

function auth(app)  {
    app.use(passport.initialize());//initialiser
    app.use(passport.session());// le session du user
    return auth;
}

auth.mid = {};

    auth.mid.ctrl_authenticate = function(req, res, next) {
        console.log(req.session);
        console.log(req.user);

        if(req.user && req.user._id !== undefined && req.user.role === 'admin')
        {
            return next();
        }
        else {
            return res.send({err: 'route need authentification'});
        }
    };

module.exports = auth;