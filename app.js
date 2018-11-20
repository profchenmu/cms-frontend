var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var proxy = require('express-http-proxy');

var app = express();

app.set('views', path.join(__dirname, 'build'));
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');
app.use('/lotteryForAdmin', proxy('http://localhost:3000', {
  proxyReqPathResolver: (req, res)=>{
    console.log(req.url);
    var resolvedPathValue = '/lotteryForAdmin'+req.url;
    return resolvedPathValue;
  },
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(path.join(__dirname, 'build')));
app.use('/*', (req, res, next) => {
  res.render('index');
});


// app.use('/', indexRouter);
// app.use('/users', usersRouter);

module.exports = app;
