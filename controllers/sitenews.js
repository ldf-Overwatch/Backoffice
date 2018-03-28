let mongoose = require('mongoose');

//news

//ajputer

exports.addnews = function (req, res) {
    let titre = req.body.titre;
    let actualite = req.body.actualite;
    let datecreation = req.body.datecreation;


    if (titre !== undefined && titre.length > 0 && actualite !== undefined && actualite.length > 0 &&
        datecreation !== undefined && datecreation.length > 0
    ) {
        let new_news = {
            titre: titre,
            actualite: actualite,
            datecreation: datecreation,

        };
        let newsObject = _db.New(new_news);

        newsObject.save(function (err, result) {
            if (err) {

                res.status(500).send(err);
            }
        });

        return res.redirect('/admin/findnews');


    }

    else {
        return res.send({err: "is empty "});
    }

};

//supprimier
exports.deleteenews = function (req, res) {

    _db.New.findByIdAndRemove(req.params.newsId, (err, news) => {
        if (err) return console.log(err);


        return res.redirect('/admin/findnews');
    });
};

//trouver
exports.findnews = function (req, res) {

    _db.New.find().exec(function (err, news) {

        if (err) console.log(err);

        return res.render('pages/lisnews.ejs', {news: news});

    });
};


exports.formAddnews = (req, res) => res.render('pages/news.ejs');

//mettre à jour

exports.updatenews = function (req, res) {


    let news_id = req.body.news_id;

    _db.New.findOne({_id: news_id}).exec(function (err, news) {

        if (err) console.log(err);


        let titre = req.body.titre;
        let actualite = req.body.actualite;
        let datecreation = req.body.datecreation ;

        if (titre !== undefined && titre.length > 0 &&
            actualite !== undefined && actualite.length > 0 &&
            datecreation !== undefined && datecreation.length > 0) {
            news.titre = titre;
            news.actualite = actualite;
            news.datecreation = datecreation;


            news.save(function (err, result) {
                if (err) {

                    res.status(500).send(err);
                }

                return res.redirect('/admin/findnews');
            });

        }

        else {
            return res.send({err: "is empty "});
        }

    });

};

////modifier
exports.findidnews = function (req, res) {

    _db.New.findById(req.params.newsId, function (err, news) {
        if (err) return console.log(err);

        return res.render('pages/editnews.ejs', {news: news});
    });
};


//Trouver tout
exports.findAllnews = function (req, res) {

    _db.New.find().exec(function (err, news) {

        if (err) console.log(err);
        return res.render('formfontnews.ejs', {news: news});

    });
};