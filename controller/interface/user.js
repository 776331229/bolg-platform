const user = module.exports = {};

/**
 * 检测用户注册信息
 * @param req 接收到的参数
 * */
function checkInfo(req,res){
    // 正则校验规则
    let regexper = {
        password : /^[\w\d]{6,18}$/,
        phone : /^1[35789]\d{9}$/,
        email : /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        qq : /^[1-9]\d$/
    },
        reqData = req.query;

    if(!reqData.username){
        res.send({
            code: 204,
            message: '请输入用户名',
            success: false
        });
        return false;
    } else if(!reqData.password){
        res.send({
            code: 204,
            message: '请输入密码',
            success: false
        });
        return false;
    } else if(!regexper.password.test(reqData.password)){
        res.send({
            code: 204,
            message: '密码为6-18位的字母+数字组合',
            success: false
        });
        return false;
    } else if(!reqData.nickName){
        res.send({
            code: 204,
            message: '请输入昵称',
            success: false
        });
        return false;
    } else if(!regexper.phone.test(reqData.phone)){
        res.send({
            code: 204,
            message: '请输入正确的手机码',
            success: false
        });
        return false;
    } else if(!regexper.email.test(reqData.email)){
        res.send({
            code: 204,
            message: '请输入正确的邮箱地址',
            success: false
        });
        return false;
    } else if(reqData.qq && !regexper.qq.test(reqData.qq)){
        res.send({
            code: 204,
            message: '请输入正确的qq号码',
            success: false
        });
        return ;
    } else if(!reqData.address){
        res.send({
            code: 204,
            message: '请输入联系地址',
            success: false
        });
        return false;
    }
    return true;
}

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
        reqData = req.query;
        condition = reqData.username ? {username : reqData.username} : {}; // 当有条件的时候，进行条件搜索

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
user.addUser = (db)=>(req,res) => {
    let collection = db.get('users'),
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
user.updateUser = (db)=>(req,res) => {
    let collection = db.get('users'),
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
user.deleteUser = (db)=>(req,res) => {
    let collection = db.get('users'),
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