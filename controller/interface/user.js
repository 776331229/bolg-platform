var URL = require('url');
var User = require('./../../lib/module/model/user');
const user = module.exports = {};

user.getUserInfo = function(db){
    return function(req,res) {
        var collection = db.get('usercollection');
        collection.find({},{},function(e,docs){
            res.send(docs);
        });
    }
};

user.login = function(req,res) {
    res.send({
        code:200,
        message: '登录成功'
    });
};

user.addUser = function(db) {
    return function(req,res){
        // Get our form values. These rely on the "name" attributes
        // var userName = req.body.username;
        // var userEmail = req.body.useremail;

        // Set our collection
        var collection = db.get('usercollection');

        // Submit to the DB
        collection.insert({
            "username" : '111',
            "email" : '222'
        }, function (err, doc) {
            if (err) {
                // If it failed, return error
                res.send("There was a problem adding the information to the database.");
            }
            else {
                res.send("添加成功");
            }
        });
    }
};