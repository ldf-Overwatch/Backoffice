'use strict';

let express = require('express');

module.exports = function(app) {

    let user = app.controllers.user;

    let auth = app.lib.auth.mid;

    let admin = express.Router();

    admin.use(auth.ctrl_authenticate);

    app.post('/', user.authenticate, user.login_success);
    app.get('/', user.index);
    admin.get('/success', user.success);
    app.get('/error', user.error);

    admin.get('/index', user.test);

    app.use('/admin', admin);


    let site =app.controllers.site;
    admin.post('/creation' , site.creation);
    admin.get('/creation' , site.creation_form);
    admin.get('/delete/:userId' , site.delete);
    admin.get('/findOne/:userId' , site.findid);
    admin.get('/find', site.find);
    admin.post('/update', site.update);


    let siteArticle = app.controllers.sitearticle;

    admin.get('/formAdd', siteArticle.formAdd );
    admin.post('/formAdd', siteArticle.add );//ajouter
    admin.post('/formUpdate', siteArticle.update );//update
    admin.get('/find1', siteArticle.find1 );//trouver
    admin.get('/article/delete/:articleId' , siteArticle.deleteearticle);//supprimier
    admin.get('/article/findOne/:articleId' ,siteArticle.findidartcile);//modifier
    app.get('/articles', siteArticle.findAll);
    app.get('/pdf/article/:id', siteArticle.findId);

    let recover = app.controllers.recover;
    admin.post('/article/search',recover.findSearch);
    admin.post('/news/search',recover.findSearchnews);



    let SiteNews =app.controllers.sitenews;
    admin.get('/formnews', SiteNews.formAddnews);
    admin.post('/formnews' , SiteNews.addnews);
    admin.get('/news/delete/:newsId' , SiteNews.deleteenews);
    admin.get('/news/findOne/:newsId', SiteNews.findidnews );
    admin.post('/formUpdatenews', SiteNews.updatenews);
    app.get('/news', SiteNews.findAllnews);
    admin.get('/findnews', SiteNews.findnews);



};

