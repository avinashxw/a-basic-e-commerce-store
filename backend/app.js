const createError = require('http-errors');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 3001;

const cartRouter = require('./routes/cart');
const adminRouter = require('./routes/admin');

const app = express();
app.use(bodyParser.json());
app.use(cors());

/* define routes */
app.use('/cart', cartRouter);
app.use('/admin', adminRouter);

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