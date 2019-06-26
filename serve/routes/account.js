var express = require('express');
var router = express.Router();

// 引入数据块连接模块
let conn = require('./js/connect')

// 拦截所有路由 处理跨域
router.all('*', (req, res, next) => {
  // 统一设置响应头
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'authorization')
  // 放行
  next()
});

// 添加账号
router.post('/accountadd', (req, res) => {

  // 接受参数
  let { account, password, userGroup } = req.body;

  // // 准备sql

  const sqlstr = `insert into accounts(account,password,userGroup) values('${account}','${password}','${userGroup}')`;
  // console.log(sqlstr);

  // 执行sql语句
  conn.query(sqlstr, (err, data) => {
    if (err) throw err;
    console.log(data);
    // 判断
    if (data.affectedRows > 0) {
      res.send({ code: 0, message: "账号添加成功" })
    } else {
      res.send({ code: 1, message: "账号添加失败" })
    }
  })
})

// // 账号列表
router.get('/accounlist', (req, res) => {
  // 准备sql
  const sqlstr = `select * from accounts order by ctime desc`
  // console.log(sqlstr);
  // 执行SQL语句
  conn.query(sqlstr, (err, data) => {
    if (err) throw err;
    res.send({ data });   //响应数据给前端
  })

})

// 删除账号
router.get('/accountedel', (req, res) => {
  // 接受前端请求的数据
  let { id } = req.query;
  // 准备sql语句
  const sqlstr = `delete from accounts where id = ${id}`;
  // console.log(sqlstr);
  // 执行sql
  conn.query(sqlstr, (err, data) => {
    if (err) throw err;
    console.log(data);
    // 判断
    if (data.affectedRows > 0) {
      res.send({ code: 0, message: "删除成功" })
    } else {
      res.send({ code: 1, message: "删除失败" })
    }

  })
})

// 修改账户
router.get('/accountedit', (req, res) => {
  // 接受前端数据强求
  let { id } = req.query;
  // 准备sql
  const sqlstr = `select * from accounts where id = ${id}`
  // console.log(sqlstr);
  // 执行SQL语句
  conn.query(sqlstr, (err, data) => {
    if (err) throw err;
    res.send({ data })
  })
})

// 保存修改
router.post('/saveedit', (req, res) => {
  // 接受前端请求数据
  let { account, userGroup, id } = req.body;
  // 准备sql
  const sqlstr = `update accounts set account='${account}',userGroup = '${userGroup}' where id = ${id}`
  console.log(sqlstr);
  // 执行sql语句
  conn.query(sqlstr, (err, data) => {
    if (err) throw err;
    if (data.affectedRows > 0) {
      res.send({ code: 0, message: "修改成功" })
    } else {
      res.send({ code: 1, massage: "修改失败" })
    }
  })
})

// 批量删除
router.get('/bachdel', (req, res) => {
  // 接受请求
  let { idArr } = req.query;
  // 准备sql
  const sqlstr = `delete from accounts where id in (${idArr})`
  // console.log(sqlstr);
  // 执行sql
  conn.query(sqlstr, (err, data) => {
    if (err) throw err;
    if (data.affectedRows > 0) {
      res.send({ code: 0, message: "删除成功！！" })
    } else {
      res.send({ code: 1, message: "删除失败！！" })
    }
  })

})

// 按照分页请求数据
router.get('/accountpage', (req, res) => {
  //   // 接受请求数据
  let { pageSize, currentPage } = req.query;
  //   // 定义变量，保存数据总条数
  let total;
  //   // 准备sql
  let sqlstr = `select * from accounts order by ctime desc`;
  // console.log(sqlstr);
  //   // 执行sql
  conn.query(sqlstr, (err, data) => {
    if (err) throw err;
    total = data.length;   //获取数据的总条数
  })
  // 构造sql 按照分页查询数据
  let n = (currentPage - 1) * pageSize;
  sqlstr += ` limit ${n},${pageSize}`;
  // console.log(sqlstr);

  // 执行sql
  conn.query(sqlstr, (err, data) => {
    if (err) throw err;
    res.send({ total, data })
  })
})

// 验证旧密码是否正确
router.post('/checkoldpass', (req, res) => {
  // 接受旧密码参数
  let { oldPwd } = req.body;
  if (oldPwd === req.user.password) {
    res.send({ code: 0, message: "原密码正确" })
  } else {
    res.send({ code: 1, message: "原密码错误" })
  }
})

// 修改密码
router.post('/passwordmodify', (req, res) => {
  // 接受新密码
  let { newPassword } = req.body;
  // 取出当前账号的id
  let id = req.user.id;
  // 构造sql
  const sqlstr = `update accounts set password = '${newPassword}' where id = ${id}`
  console.log(sqlstr);

  // 执行sql
  conn.query(sqlstr, (err, data) => {
    if (err) throw err;
    if (data.affectedRows > 0) {
      res.send({ code: 0, message: "密码修改成功！请重新登录" })
    } else {
      res.send({ code: 1, message: "密码修改失败" })
    }
  })

})

// 获取当前登录账号的信息
router.get('/accountinfo', (req, res) => {
  // 获取id
  let id = req.user.id;
  // 创建sql
  const sqlstr = `select * from accounts where id =${id}`;
 
  // 执行sqlstr
  conn.query(sqlstr, (err, data) => {
    if (err) throw err;
    res.send({ data })
  })

})

// 账户权限
router.get('/role',(req,res)=>{
  res.send({role:req.user.userGroup})

})
module.exports = router;
