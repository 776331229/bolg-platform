var URL = require('url');
var User = require('./../../lib/module/model/user');
const user = module.exports = {};

user.login = function(req,res) {
    res.send({
        code:200,
        message: '登录成功'
    });
};

user.getUserInfo = function(db){
    return function(req,res) {
        console.log(req.query.id);
        var collection = db.get('article');
        collection.find({},{},function(e,docs){
            res.send(docs);
        });
    }
};

user.addUser = function(db) {
    return function(req,res){
        // Get our form values. These rely on the "name" attributes
        // var userName = req.body.username;
        // var userEmail = req.body.useremail;

        // Set our collection
        var collection = db.get('article');

        // Submit to the DB
        collection.insert({
            "username1" : '111',
            "email" : '222',
            "sex" : '222',
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

user.updateUser = function(db) {
    return function(req,res){
        // Get our form values. These rely on the "name" attributes
        // var userName = req.body.username;
        // var userEmail = req.body.useremail;

        // Set our collection
        var collection = db.get('article');

        // Submit to the DB
        collection.update({"username":'111'},{
            "username" : '333',
            "email" : '333',
            "sex" : '333',
        }, function (err, doc) {
            if (err) {
                // If it failed, return error
                res.send("There was a problem adding the information to the database.");
            }
            else {
                res.send("修改成功");
            }
        });
    }
};

user.deleteUser = function(db) {
    return function(req,res){
        // Get our form values. These rely on the "name" attributes
        // var userName = req.body.username;
        // var userEmail = req.body.useremail;
        console.log(req.body.username);
        // Set our collection
        var collection = db.get('article');

        // Submit to the DB
        collection.remove({"username":'333'}, function (err, doc) {
            if (err) {
                // If it failed, return error
                res.send("There was a problem adding the information to the database.");
            }
            else {
                res.send("删除成功");
            }
        });
    }
};