var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// 引入路由
var accountRouter = require('./routes/account')
var loginRouter = require('./routes/login')
var goodsRouter = require('./routes/goods')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 引入express-jwt模块
const expressJwt = require('express-jwt');
//定义秘钥
const secret = 'itsource';
//使用中间件验证token合法性
app.use(expressJwt({
  secret: secret
}).unless({
  path: ['/login/checklogin']  //除了登录地址，其他的URL都需要验证
}));
//拦截器
app.use(function (err, req, res, next) {
  //当token验证失败时会抛出如下错误
  if (err.name === 'UnauthorizedError') {
  
    res.status(401).send('token无效');
  }
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 分配路由
app.use('/account', accountRouter);//账号管理模块
app.use('/login', loginRouter);  //登录模块
app.use('/goods', goodsRouter);  //商品管理模块


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
// 监听端口
app.listen(3000, () => {
  console.log("服务器地址是：http://127.0.0.1:3000");

})
module.exports = app;
