var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const multer = require("multer");
const fs = require("fs");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser());
app.use(cookieSession({
  name : "count_info",    //cookie的key
  keys : ["keys0"],    //cookie的加密方式
  // maxAge : 1000*10,   //cookie的保存时长（10s）
}));


//----------------上传资源路径地址----------------------------------
let storage = multer.diskStorage({
  destination : function(req,file,cb){
    if(req.url.includes("userSub")){
      cb(null,path.join(__dirname, 'public','upload','user'))
    }else if(req.url.includes("proSub")){
      cb(null,path.join(__dirname, 'public','upload','production'))
    }
  }
})

let upload = multer({storage})
app.use(upload.any());



// ----------------项目静态资源托管-------------------------
app.use(express.static(path.join(__dirname , "public" , "template","管智涵","dist","html")));
app.use(express.static(path.join(__dirname , "public" , "template","管智涵","dist")));


//----------------------后端托管---------------------------------------
app.use('/admin',express.static(path.join(__dirname, 'public','admin')));
app.use(express.static(path.join(__dirname, 'public','upload')));

// app.use(express.static(path.join(__dirname + "public" + "template")));

// -------------项目路由配置----------------------------
app.use("/admin/login.html",require("./routes/login"));
app.use("/admin/logout",require("./routes/logout"))

app.all("/admin/*.html",require("./routes/islogin"));

app.use("/admin/banner.html",require("./routes/banner"));
app.use("/admin/banner_add.html",require("./routes/banner_add"));
app.use("/admin/error.html",require("./routes/error"));
app.use("/admin/home.html",require("./routes/home"));
app.use("/admin/product_add.html",require("./routes/product_add"));
app.use("/admin/product.html",require("./routes/product"));
app.use("/admin/reg.html",require("./routes/reg"));
app.use("/admin/success.html",require("./routes/success"));
app.use("/admin/user_add.html",require("./routes/user_add"));
app.use("/admin/user.html",require("./routes/user"));



//---------------给前端api路由-----------------------------------------
app.use("/customer/demo",require("./routes/api/demo"));










// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
