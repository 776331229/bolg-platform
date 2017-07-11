var express = require('express');
var router = express.Router();
var users = require('../controller/interface/user');

var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/nodeServerTest');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/getUserInfo', users.getUserInfo(db));
router.get('/login', users.login);
router.get('/addUser', users.addUser(db));

module.exports = router;
