
/**
* ExpressJS Crash Course
* @link => YT https://www.youtube.com/watch?v=gnsO8-xJ8rs&t=991&ab_channel=TraversyMedia
* Course ended at 49:14
*
*/


/**
* Module dependencies
*/
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require('express-validator');

/** Express class instance
* @see {@link => http://expressjs.com/fr/guide/routing.html}
*/
var app = express();

var undo = function () {
    var logger = function(req, res, next) {
        console.log("logging...")
            /** Middleware
             * @see {@link http://expressjs.com/fr/guide/using-middleware.html}
             * @book {@page => 221}
             */
        next();
    }

    /** Mounts the specified middleware
     * @see {@link http://expressjs.com/fr/4x/api.html#app.use }
     */
    app.use(logger);
};

// view engine
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

// add middleware for the body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// set static path
app.use(express.static(path.join(__dirname,'public')));

// Global vars
app.use(function (req, res, next) {
	res.locals.errors = null;
	next();
});


/** GET method route for home page (application root)
* @see {@link http://expressjs.com/fr/4x/api.html#app.get}
*/


// express validator middleware
app.use(expressValidator()); 

var users = [
	{
		id:1,
		first_name:'John',
		last_name:'Doe',
		emain:'johndoe@gmail.com'
	},
	{
		id:2,
		first_name:'Bob',
		last_name:'Smith',
		emain:'bobsmith@gmail.com'
	},
	{
		id:3,
		first_name:'Jill',
		last_name:'Jackson',
		emain:'jjackson@gmail.com'
	}		
]

app.get('/', function (req, res) {
	//res.send('Hello');
	//var title = 'Custormers';
	res.render('index', {
		title: 'Custormers',
		users: users
	});
});


app.post('/users/add', function (req,res) {
	//console.log(req.body.first_name)

req.checkBody('first_name','First Name is Required').notEmpty();
req.checkBody('last_name','Last Name is Required').notEmpty();
req.checkBody('email','Email is Required').notEmpty();

var errors = req.validationErrors();

if (errors) {
	console.log("ERRORS")
	res.render('index', {
		title: 'Custormers',
		users: users,
		errors: errors
	});
} else {
		var newUser = {
		first_name:req.body.first_name,
		last_name:req.body.last_name,
		email:req.body.email
	}

	console.log("SUCCES")
}


	console.log('newUser =>',newUser)

})

/** Start server and listen on specified  port 
* @see {@link http://expressjs.com/fr/4x/api.html#app.listen}
*/
app.listen(3000, function () {
	console.log("Server started on port 3000");
})
