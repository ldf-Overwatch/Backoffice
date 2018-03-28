let mongoose = require('mongoose');

//search

exports.findSearch = function(req, res) {


    if (!req.body) {
        return res.redirect('/admin/find1');
    }

    _db.Article.aggregate([
        {
            $match: {$text: {$search: req.body.Search}}
        }]).exec(function(err, articles){
        if (err) console.log(err);

        return res.render('pages/listarticle.ejs', {articles : articles});

    });


};

exports.findSearchnews = function(req, res) {

    if (!req.body) {
        return res.redirect('/admin/findnews');
    }
    _db.New.aggregate([
        {
            $match: {$text: {$search: req.body.Search}}
        }]).exec(function(err, news){
        if (err) console.log(err);

        return res.render('pages/lisnews.ejs', {news : news});

    });


};





