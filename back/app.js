var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');

var routes = require('./routes/index');
var users = require('./routes/users');
var init = require('./config/initialize');


var app = express();
const port = process.env.PORT || 3000;
const db = require('./config/db');
var api = express.Router();
// plugin native promise library to mongo
mongoose.Promise = global.Promise;



/*
* connect to our mongoDB database (commented out after you enter in your
* own credentials)
*/
mongoose.connect(db[app.settings.env], (err, res) => {
	if(err)
		console.log(`Error connecting to DB: ${err}`);
	else
		console.log(`Connected to DB ${app.settings.env}`);
});

init.init()


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.use('/', routes);
app.use('/users', users);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
}
// API router config ===========================================================
api.all('/*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.listen(port)
console.log('Magic happens on port ' + port) 			// shoutout to the user
exports = module.exports = app 						// expose app
