let mongoose = require('mongoose');

//username

//ajouter
exports.creation = function(req, res ) {

    //recuperer dans le form le name
    let username = req.body.username;
    let password = req.body.password;
    let role = (req.body.role)? req.body.role:'user';

    if (username !== undefined  && username.length > 0 && password !== undefined  && password.length > 0)
    {

        // changer
        let new_user = {
            username: username,
            password: password,
            role: role
        };
         //db connection a la base de donnée
        let userObject = _db.User(new_user);

        userObject.save(function(err, result) { // erreu
            if (err) {

                res.status(500).send(err);
            }

            return res.redirect('/admin/find');
        });

    }

    //
    else {
        return res.send({err : "username or password is empty"});
    }

};




//supprimier
exports.delete = function(req, res)  {

    _db.User.findByIdAndRemove(req.params.userId, (err,user) => {

        /*response = {
            message: "supprimé avec succès",
            id:user._id
        };*/
        return res.redirect('/admin/find');
    });
};

//modifier

exports.findid = function(req, res) {

    _db.User.findById(req.params.userId, function (err, user) {
        if (err) return handleError(err);

        return res.render('pages/edit.ejs', { user : user});
    });
};

//mettre à jour
exports.update = function(req,res) {
    _db.User.findById(req.body._id, function (err, user) {
        if (err) return handleError(err);

        user.username = req.body.username;
        user.password = req.body.password;
        user.role = req.body.role;

        user.save(function(err, user) {

            if(err) console.log(err);

            return res.render('pages/edit.ejs', {user: user});

        });

    });

};


//trouver
exports.find=function (req, res) {

    _db.User.find().exec(function (err, users) {

        if (err) console.log(err);

        return res.render('pages/list.ejs', { users : users});

    });

};




exports.creation_form = (req, res) => res.render('pages/form.ejs', { root : __dirname});






