var express = require('express');
var router = express.Router();
var users = require('../controller/interface/user');

var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/blog-platform');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', users.login(db))
    .get('/getUser', users.getUser(db))
    .get('/addUser', users.addUser(db))
    .get('/updateUser', users.updateUser(db))
    .post('/deleteUser', users.deleteUser(db));

module.exports = router;
