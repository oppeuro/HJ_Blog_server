var mongoose = require('mongoose')
DB_ARTICLES_URL = 'mongodb://localhost:27017/article'
DB_USERS_URL = 'mongodb://localhost:27017/user'

var articleDB = mongoose.createConnection(DB_ARTICLES_URL);
var userDB = mongoose.createConnection(DB_USERS_URL);

//var db = mongoose.connection;
mongoose.articleDB = articleDB;
mongoose.userDB = userDB;

articleDB.on('error',function(err) {
	console.log('Mongoose connection error: ' + err);
})

articleDB.on('connected',function() {
	console.log('Mongoose connected');
})

articleDB.on('disconnected',function() {
	console.log('Mongoose connection disconnected');
})

userDB.on('error',function(err) {
    console.log('Mongoose connection error: ' + err);
})

userDB.on('connected',function() {
    console.log('Mongoose connected');
})

userDB.on('disconnected',function() {
    console.log('Mongoose connection disconnected');
})

module.exports = mongoose;