var express = require('express');
var router = express.Router();


/* 统一设置响应头解决跨域 */
router.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers','authorization')
    next() // 放行
})

// 引入数据块连接模块
let conn = require('./js/connect')

// 引入jwt
let jwt = require('jsonwebtoken');
// 定义秘钥
const secret = 'itsource';


// 登录 检查账号和密码是否正确
router.post('/checklogin', (req, res) => {
    // 接受参数
    let { account, password } = req.body;
    // 准备sql
    const sqlstr = `select * from accounts where account = '${account}' and password = '${password}'`;
    // console.log(sqlstr);

    // 执行sql
    conn.query(sqlstr, (err, data) => {
        if (err) throw err;
        if (data.length) {
            // 生成token
            let account = data[0].account;  //获取用户名
            const token = jwt.sign(Object.assign({}, data[0]), secret, {
             
                expiresIn: 60 * 60 * 2  //账号过期时间
            })
            console.log(token);
            
            res.send({ code: 0, message: "欢迎你，登录成功！", token})
        } else {
            res.send({ code: 1, message: "请检查用户名或密码！" })
        }
    })

})


module.exports = router;