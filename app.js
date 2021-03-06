var createError = require('http-errors');
const http = require('http');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var lossregisterRouter = require('./routes/lossregister');
var lossRouter = require('./routes/lossdata');
var userRouter = require('./routes/user');
var updatelossRouter = require('./routes/updateloss');
var paratoRouter = require('./routes/parato');
 var usersRouter = require('./routes/users');
// var speedlossdashboard = require('./routes/lossdata');
const { normalize } = require('path');

var app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');


// var port=normalizePort(process.env.PORT || '5000');
// app.set('port', port);

app.set('port', process.env.PORT || '64690');
console.log("+++++++++++++"+ app.get('port'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', lossregisterRouter);
app.use('/', lossRouter);
app.use('/', userRouter);
app.use('/', updatelossRouter);
app.use('/', paratoRouter);
 app.use('/', usersRouter);
// app.use('/lossdata',speedlossdashboard);

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

// const server = http.createServer((req, res) => {
//     res.statusCode = 200;
//     const msg = 'Hello world!\n'
//     res.end(msg);
//   });
  app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' +app.get('port'));
});
