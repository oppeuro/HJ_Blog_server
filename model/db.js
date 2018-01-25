var mongoose = require('mongoose')
DB_URL = 'mongodb://localhost:27017/article'

mongoose.connect(DB_URL);

var db = mongoose.connection;

db.on('error',function(err) {
	console.log('Mongoose connection error: ' + err);
})

db.on('connected',function() {
	console.log('Mongoose connected');
})

db.on('disconnected',function() {
	console.log('Mongoose connection disconnected');
})


module.exports = mongoose;