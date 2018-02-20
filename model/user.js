var mongoose = require('./db.js')
var Schema = mongoose.Schema;

var userSchema = new Schema({
    userName: {type: String},
    passWord: {type: String},
})

module.exports = mongoose.userDB.model("user",userSchema);