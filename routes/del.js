var express = require('express');
var Article = require('../model/article');
var fs = require('fs');
var path = require('path');
var router = express.Router();


router.get('/:id', function (req, res, next) {
    var _id = req.params.id;
    Article.findById(_id, function (err, data) {
        if(data.bgImgName) {
            var imgPath = path.join(__dirname,'../static',data.bgImgName);
            fs.existsSync(imgPath) && fs.unlinkSync(imgPath);
        }
        data.remove();
        res.send({delete: true});
    })
})

module.exports = router;