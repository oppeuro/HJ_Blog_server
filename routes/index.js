var express = require('express');
var Article = require('../model/model')
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/api/getArticle/:id',function (req, res, next) {
    var id = req.params.id;
    Article.findById(id,function(err, data) {
        if(err) {
            console.log(err);
        }else {
            res.send(data);
        }
    })
})

router.get('/api/getArticleNum',function (req, res, next) {
    Article.find({},function(err, resdata) {
        if(err) {
            console.log(err);
        }else {
            res.send(resdata);
        }
    })
})

//分页查询
// const pageSize = 5;
// router.post('/api/getArticleList',function (req, res, next) {
//     var page =  req.body.page;
//     var skipNum = page*pageSize;
//     Article.find({}).skip(skipNum).limit(pageSize).exec(function(err, data) {
//         if(err) {
//             console.log(err);
//         }else {
//             res.send(data);
//         }
//     })
// })


router.post('/api/getArticleList',function (req, res, next) {
    var page =  Number.parseInt(req.body.page);
    var adminPageSize = Number.parseInt(req.body.pageSize);
    var skipNum = page*adminPageSize;
    Article.find({}).skip(skipNum).limit(adminPageSize).exec(function(err, data) {
        if(err) {
            console.log(err);
        }else {
            res.send(data);
        }
    })
})

router.post('/api/updateArticle',function (req, res, next) {
    var articleID = {_id:req.body._id};
    var updateData = req.body
    //console.log(req.body);
    // var updateData = {
    //     date:req.body.date,name:req.body.name,
    //     type:req.body.type,intro:req.body.intro,
    //     resource:req.body.resource,data:req.body.data}
    Article.update(articleID, updateData,function (err, data) {
        if(err) {
            console.log(err)
        }else {
            res.send("更新成功");
        }
    });
})


router.post('/api/newArticle',function (req, res, next) {
    console.log(req.body)
    var article = new Article(req.body);
    article.save(function (err, data) {
        if(err) {
            console.log(err)
        }else {
            res.send("上传成功");
        }
    });
})


module.exports = router;
