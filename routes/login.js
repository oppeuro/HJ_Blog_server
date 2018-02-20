var express = require('express');
var User = require('../model/user');
var router = express.Router();


router.post('/', function (req, res, next) {
    var user = req.body.userName;
    var psd = req.body.passWord;
    User.findOne({userName: user}, function (err, data) {
        if(err) {
            res.send({login: false})
        }else {
            if(data == null) {
                res.send({login: false})
            }else if(data.passWord == psd) {
                res.send({login: true})
            }else {
                res.send({login: false})
            }
        }
    })
})


module.exports = router;