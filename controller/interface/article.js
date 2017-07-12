const article = module.exports = {};

/**
 * 获取用户信息列表接口
 * */
article.getArticle = (db)=>(req,res) => {
    let collection = db.get('articles'),
        reqData = req.query;
        condition = reqData.articleId ? {articleId : reqData.articleId} : {}; // 当有条件的时候，进行条件搜索

    collection.find(condition,function(error,result){
        if (error) {
            res.send("There was a problem adding the information to the database.");
        } else {
            // 判断是否内容
            if(result.length > 0){
                res.send({
                    code:200,
                    message:'获取成功',
                    data:{
                        total:result.length,
                        list:result
                    },
                    success: true
                });
            } else {
                res.send({
                    code:204,
                    message:'暂无数据',
                    data:{
                        total:0,
                        list:[]
                    },
                    success: false
                });
            }
        }
    });
};

/**
 * 新增用户接口
 * */
article.addArticle = (db)=>(req,res) => {
    let collection = db.get('articles'),
        reqData = req.query;

    if(!checkInfo(req,res)){
        return ;
    }

    let data = {
        articleId: 1,
        articleTitle: 1,
        articleContent:'',
    };

    // Submit to the DB
    collection.insert(data, (error, result)=> {
        if (error) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        } else {
            res.send({
                code: 200,
                message: '新增成功',
                success: true
            });
        }
    });
};

/**
 * 更新用户信息接口
 * */
article.updateArticle = (db)=>(req,res) => {
    let collection = db.get('articles'),
        reqData = req.query;

    if(!checkInfo(req,res)){
        return ;
    }

    let data = {
        username : reqData.username,
        password : reqData.password,
        nickName : reqData.nickName,
        sex : reqData.sex,
        birthday : reqData.birthday || '',
        phone : reqData.phone,
        email : reqData.email,
        qq : reqData.qq,
        address : reqData.address,
        like : reqData.like || [],
    };

    // Submit to the DB
    collection.update({username:reqData.username},data, (error, result)=> {
        if (error) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        } else {
            res.send({
                code: 200,
                message: '修改成功',
                success: true
            });
        }
    });
};

/**
 * 删除用户信息接口
 * */
article.deleteArticle = (db)=>(req,res) => {
    let collection = db.get('articles'),
        reqData = req.query;

    // Submit to the DB
    collection.remove({username:reqData.username}, (error, result)=> {
        if (error) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            res.send({
                code: 200,
                message: '删除成功',
                success: true
            });
        }
    });
};