var express = require('express');
var router = express.Router();
var users = require('../controller/interface/user');
var articles = require('../controller/interface/article');

var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/blog-platform');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/**
 * 用户管理模块
 * */
router.post('/user/login', users.login(db))
    .get('/user/getUser', users.getUser(db))
    .get('/user/addUser', users.addUser(db))
    .get('/user/updateUser', users.updateUser(db))
    .get('/user/deleteUser', users.deleteUser(db));

/**
 * 文章管理模块
 * */
router.get('/article/getArticle', articles.getArticle(db))
    .get('/article/addArticle', articles.addArticle(db))
    .get('/article/updateArticle', articles.updateArticle(db))
    .get('/article/deleteArticle', articles.deleteArticle(db));

module.exports = router;
