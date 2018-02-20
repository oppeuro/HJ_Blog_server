var mongoose = require('./db.js')
var Schema = mongoose.Schema;

var articleSchema = new Schema({
	name: {type: String},
	type: {type: Array},
	date: {type: String},
	updateTime:{type: String},
	isTop:{type:Number,default:0},
	intro: {type: String},
	resource: {type: String},
	bgImgName: {type: String},
	data: {type: String}
})

module.exports = mongoose.articleDB.model("article",articleSchema);