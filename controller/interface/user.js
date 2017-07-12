const user = module.exports = {};

/**
 * 登录接口
 * */
user.login = (db)=>(req,res) => {
    let collection = db.get('users'),
        {username , password} = req.body; // 接收用户名、密码
    collection.find({username},(error,result)=>{
        if (error) {
            res.send("There was a problem adding the information to the database.");
        } else {
            // 当有该用户名时候，则判断密码是否正确
            if(result.length > 0){
                if(result[0].password === password){
                    res.send({
                        code:200,
                        message:'登录成功',
                        success: true
                    });
                } else {
                    res.send({
                        code:201,
                        message:'密码错误',
                        success: false
                    });
                }
            } else {
                res.send({
                    code:204,
                    message:'该用户名不存在，请检查',
                    success: false
                });
            }
        }
    });
};

/**
 * 获取用户信息列表接口
 * */
user.getUser = (db)=>(req,res) => {
    let collection = db.get('users'),
    username = req.query.username || null;
    collection.find({username},function(error,result){
        if (error) {
            res.send("There was a problem adding the information to the database.");
        } else {
            // 判断是否内容
            if(result.length > 0){
                res.send({
                    code:200,
                    message:'获取成功',
                    data:result,
                    success: true
                });
            } else {
                res.send({
                    code:204,
                    message:'暂无数据',
                    data:[],
                    success: false
                });
            }
        }
    });
};

/**
 * 新增用户接口
 * */
user.addUser = function(db) {
    return function(req,res){
        // Get our form values. These rely on the "name" attributes
        // var userName = req.body.username;
        // var userEmail = req.body.useremail;

        // Set our collection
        var collection = db.get('users');

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

/**
 * 更新用户信息接口
 * */
user.updateUser = function(db) {
    return function(req,res){
        // Get our form values. These rely on the "name" attributes
        // var userName = req.body.username;
        // var userEmail = req.body.useremail;

        // Set our collection
        var collection = db.get('users');

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

/**
 * 删除用户信息接口
 * */
user.deleteUser = function(db) {
    return function(req,res){
        // Get our form values. These rely on the "name" attributes
        // var userName = req.body.username;
        // var userEmail = req.body.useremail;
        console.log(req.body.username);
        // Set our collection
        var collection = db.get('users');

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