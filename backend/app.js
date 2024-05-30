const createError = require('http-errors');
const express = require('express');
var path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 3001;

const cartRouter = require('./routes/cart');
const adminRouter = require('./routes/admin');
const indexRouter = require('./routes/index');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/* define routes */
app.use('/cart', cartRouter);
app.use('/admin', adminRouter);
app.use('/index', indexRouter);

/* 
** catch 404 and forward to error handler 
*/
app.use(function(req, res, next) {
    next(createError(404));
});

/* 
** error handler 
*/
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.header("Access-Control-Allow-Origin", "*");;
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.listen(PORT, (error) => {
    if(!error) {
        console.log('Server is running & listening on PORT', PORT);
    }
    else {
        console.log('An error occured!', error);
    }
});
  

module.exports = app;