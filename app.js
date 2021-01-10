const createError = require('http-errors');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// const minify = require('express-minify');

const mainRoutes = require('./routes/mainRoutes');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Logger
// app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());



app.locals = {
	site: {
		title: 'Admin Dashboard',
		author: 'Jossy Jones',
		description: 'Admin Dashboard',
		keyword: 'Dashboard',
		name: 'Administrator',
		email: 'admin@company.com'
	}
}


app.use('/', mainRoutes);

let port = 7070;

app.listen(port, () => {
	console.log(`App is listening at port: ${port}`);
})

// module.exports = app;
