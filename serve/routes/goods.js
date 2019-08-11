var express = require('express');
var router = express.Router();

/* 统一设置响应头解决跨域 */
router.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'authorization')
    next() // 放行
})

// 引入数据块连接模块
let conn = require('./js/connect')
// 添加商品
router.post('/goodsadd', (req, res) => {
    // 接受参数
    let { classify, goodsCode, goodsName, goodsPrice, marketPrice, purchase, storageNum, goodsWeight, goodsUnit, memberDeals, isPromotion, goodsDesc } = req.body
    // 创建sql
    const sqlstr = `insert into goods(classify,goodsCode,goodsName,goodsPrice,marketPrice,purchase,storageNum,goodsWeight,goodsUnit,memberDeals,isPromotion,goodsDesc) values(?,?,?,?,?,?,?,?,?,?,?,?)`
    // 参数
    const sqlParams = [classify, goodsCode, goodsName, goodsPrice, marketPrice, purchase, storageNum, goodsWeight, goodsUnit, memberDeals, isPromotion, goodsDesc]

    // 执行sql
    conn.query(sqlstr, sqlParams, (err, data) => {
        if (err) throw err;
        if (data.affectedRows > 0) {
            res.send({ code: 0, message: "添加商品成功" })
        } else {
            res.send({ code: 1, message: "添加商品失败" })
        }
    })

})

// // 商品列表
router.get('/goodslist', (req, res) => {
    // 接受参数
    let { pageSize, currentPage, classify, keyWord } = req.query;
    // 创建sql
    let sqlstr = `select * from goods where 1 = 1`;
   
    // 定义变量  保存总条数
    let total;

    //     // 如果分类不等于空，并且不等于‘全部分类’
    if (classify !== '' && classify !== '全部分类') {
        // 拼接第一个查询条件
        sqlstr += ` and classify='${classify}'`;
    }
    // 如果第二个关键字不为空  那么拼接sql
    if (!keyWord == '') {
        sqlstr += ` and (goodsName like '%${keyWord}%' or goodsCode like '%${keyWord}%')`
    }

    // 拼接排序
    sqlstr += ` order by ctime desc`

    // 执行sql、
    conn.query(sqlstr, (err, data) => {
        if (err) throw err
        total = data.length;
        //    console.log(total);
    })
    // 拼接分页sql
    let n = (currentPage - 1) * pageSize;
    sqlstr += ` limit ${n}, ${pageSize}`;

    // 执行sql
    conn.query(sqlstr, (err, data) => {
        if (err) throw err;
        res.send({ total, data })
    })

})

// 删除
router.get('/goodsmolve', (req, res) => {
    // 接受参数
    let { id } = req.query;
    // 准备sql
    const sqlstr = `delete from goods where id = ${id}`;
    // console.log(sqlstr);
    // 执行sql
    conn.query(sqlstr, (err, data) => {
        if (err) throw err;
        if (data.affectedRows > 0) {
            res.send({ code: 0, message: "删除成功" })
        } else {
            res.send({ code: 1, message: "删除失败" })
        }

    })


})

// 编辑
router.get('/goodsedit', (req, res) => {
    // 接受参数
    let { id } = req.query;
    // 准备sql
    const sqlstr = `select * from goods where id = ${id}`
    conn.query(sqlstr, (err, data) => {
        if (err) throw err;
        // console.log(data); 
        res.send({ data });
    })

})

// 保存修改
router.post('/saveedit', (req, res) => {
    // 接受参数、
    let { goodsName, classify, isPromotion, id } = req.body;
    // 准备sql
    const sqlstr = `update goods set goodsName='${goodsName}',classify='${classify}',isPromotion='${isPromotion}'where id = ${id}`
    // console.log(sqlstr);
    // 执行sql
    conn.query(sqlstr, (err, data) => {
        if (err) throw err;
        if (data.affectedRows > 0) {
            res.send({ code: 0, message: "修改成功" })
        } else {
            res.send({ code: 1, message: "修改失败" })
        }
    })
})

// 批量删除
router.get('/bachdel', (req, res) => {
    // 接受参数
    let { idArr } = req.query;
    // 准备sql
    const sqlstr = `delete from goods where id in (${idArr})`
    // console.log(sqlstr);
    // 执行sql
    conn.query(sqlstr, (err, data) => {
        if (err) throw err;
        if (data.affectedRows > 0) {
            res.send({ code: 0, message: "删除成功！" })
        } else {
            res.send({ code: 1, message: "删除失败！" })
        }
    })

})

// 模糊查询
router.get('/search', (req, res) => {
    // 接受参数
    let { classify, keyWord } = req.query;
    // 准备sql
    let sqlstr = `select * from goods where 1 = 1`;
    // 如果分类不等于空，并且不等于‘全部分类’
    if (classify !== '' && classify !== '全部分类') {
        // 拼接第一个查询条件
        sqlstr += ` and classify='${classify}'`;
    }
    // 如果第二个关键字不为空  那么拼接sql
    if (!keyWord == '') {
        sqlstr += ` and (goodsName like '%${keyWord}%' or goodsCode like '%${keyWord}%')`
    }
    console.log(sqlstr);
    // 执行sql
    conn.query(sqlstr, (err, data) => {
        if (err) throw err;
        res.send({ data })  //把查询结果响应给前端
    })
})

module.exports = router;