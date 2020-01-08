const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

//Routers
const indexRouter = require('./routes/index');
const restaurantRouter = require('./routes/restaurants');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const userRouter = require('./routes/user');

const app = express();
const headers = {
  "origin": "http://localhost:4200",
  'allowedHeaders': ['Content-Type', 'authorization', 'Content-Type', 'application/json', 'Content-Type', 'credentials', 'Access-Control-Allow-Credentials', true, 'withCredentials', true],
  'Access-Control-Allow-Credentials': true,
  'credentials': true
}/*

//Allow CORS
app.use(cors(headers));*/

/*app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  next();
})*/

app.use(cors(headers))

//Trust first proxy
app.set('trust proxy', 1)

//View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Router setup
app.use('/', indexRouter);
app.use('/restaurants', restaurantRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/user', userRouter);

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

app.listen(4201, () => {
  console.log('listening on port 4201')
});

module.exports = app;
