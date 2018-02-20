var express = require('express');
var Article = require('../model/article')
var router = express.Router();

router.get('/', function (req, res, next) {
    var tagsObj = {};
    Article.find({}, function (err, data) {
        if(err) {

        }else {
            var blogsData = data;
            blogsData.forEach(function (val, index) {
                val.type.forEach(function (tag, index) {
                    if(!tagsObj[tag]) {
                        tagsObj[tag] = 1;
                    }else {
                        tagsObj[tag]++;
                    }
                })
            })
            res.send(tagsObj);
        }

    })
})

router.get('/:tag',function (req, res, next) {
    var tag = req.params.tag;
    //var reg = new RegExp(','+tag+','+'|^'+tag+'|'+tag+'$');
    var queryCondition = {type:tag}
    Article.find(queryCondition,function (err, data) {
        if(err) {

        }else {
            res.send(data);
        }
    })
})


module.exports = router;