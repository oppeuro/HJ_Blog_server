var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
//引入上传插件
var formidable = require('formidable');

router.post('/img/:name',function (req, res, next) {
    var fileName = req.params.name;
    var form = new formidable.IncomingForm();
    var allFile = [];
    form.encoding = 'utf-8';
    form.uploadDir = path.join(__dirname,'../','static');
    form.keepExtensions = true;
    form.maxFieldsSize = 10*1024*1024;
    form.on('file', function (filed, file) {
        allFile.push([filed, file]);
    })
    form.parse(req, function(err, fields, files) {
        if(err) {
            console.log(err);
        }
        console.log()
        allFile.forEach(function (file, index) {
            var fieldName=file[0];
            var types = file[1].name.split('.');
            var date = new Date().toLocaleDateString();
            fs.renameSync(file[1].path,form.uploadDir+"/"+date+'_'+fileName+"."+String(types[types.length-1]));
        })
        res.send('good')
    });
})


module.exports = router;