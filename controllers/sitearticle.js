let mongoose = require('mongoose');
//article
let PDF = require('../lib/pdf.js');
//ajouter

exports.add = function(req, res ) {

    let titre = req.body.titre;
    let auteur = req.body.auteur;
    let chapeau = req.body.chapeau;
    let description1 = req.body.description1;

    if (titre !== undefined  && titre.length > 0 && auteur!== undefined  && auteur.length > 0
        && chapeau!== undefined  && chapeau.length > 0
        && description1!== undefined  && description1.length > 0
    )
    {
    let new_article = {
        titre: titre,
        auteur: auteur,
        chapeau: chapeau,
        description1: description1
    };

    let articleObject = _db.Article(new_article);


        articleObject.save(function (err, result) {
        if (err) {

            res.status(500).send(err);
        }

            return res.redirect('/admin/find1');
    });

    }

else {
    return res.send({err : "is empty "});
}

};


exports.update = function(req, res ) {

    let article_id = req.body.article_id;

    _db.Article.findOne({_id: article_id}).exec(function(err, article){

        if(err) console.log(err);


        let titre = req.body.titre;
        let auteur = req.body.auteur;
        let chapeau = req.body.chapeau;
        let description1 = req.body.description1;

        if (titre !== undefined  && titre.length > 0 && auteur!== undefined  && auteur.length > 0
            && chapeau!== undefined  && chapeau.length > 0
            && description1!== undefined  && description1.length > 0
        )
        {

            article.titre = titre;
            article.auteur = auteur;
            article.chapeau = chapeau;
            article.description1 = description1;

            article.save(function (err, result) {
                if (err) {

                    res.status(500).send(err);
                }

                return res.redirect('/admin/find1');
            });

        }

        else {
            return res.send({err : "is empty "});
        }

    });

};


//trouver
exports.find1=function (req, res) {

    _db.Article.find().exec(function (err, articles) {

        if (err) console.log(err);

        return res.render('pages/listarticle.ejs', {articles : articles});

    });
};
    //supprimier
exports.deleteearticle = function(req, res)  {

        _db.Article.findByIdAndRemove(req.params.articleId, (err,articles) => {
            if (err) return console.log(err);


            return res.redirect('/admin/find1');
        });
};

////modifier
exports.findidartcile = function(req, res) {

    _db.Article.findById(req.params.articleId, function (err, article) {
        if (err) return console.log(err);

        return res.render('pages/editartcile.ejs', { article : article});
    });
};




exports.formAdd = (req, res) => res.render('pages/article.ejs');


//Trouver tout
exports.findAll=function (req, res) {

    _db.Article.find().exec(function (err, articles) {

        if (err) console.log(err);

        return res.render('pages/formfont.ejs', {articles: articles});

    });
};

exports.findId = function(req, res)
{
  let id = req.params.id;

  _db.Article.findById(id).exec(function(err, doc){

      if(doc)
      {
          let renderer = new PDF();

          let html = doc.titre+': <br/>'
              + doc.auteur+' <br/>'
              + doc.chapeau +' <br/>'
              + doc.description1;


          renderer.setCSS('http://pages/listarticle.ejs');
          renderer.build(html);

          return res.pdfFromHTML({ // express-pdf kicks in
              filename: doc._id.toString() + '.pdf',
              htmlContent: renderer.html
          });
      } else {
          return res.send('article not found');
      }
  });

};



