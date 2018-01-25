var mongoose = require('./db.js')
var Schema = mongoose.Schema;

var articleSchema = new Schema({
	name: {type: String},
	type: {type: String},
	date: {type: String},
	intro: {type: String},
	resource: {type: String},
	bgImgName: {type: String},
	data: {type: String}
})

module.exports = mongoose.model("article",articleSchema);