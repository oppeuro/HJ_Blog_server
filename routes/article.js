var express = require('express');
var Article = require('../model/article')
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
    Article.count({},function(err, resdata) {
        if(err) {
            console.log(err);
        }else {
            res.send({num: resdata});
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
    var page =  Number.parseInt(req.body.page) || 0;
    var adminPageSize = Number.parseInt(req.body.pageSize) || 0;
    var skipNum = page*adminPageSize || 0;
    console.log(page,adminPageSize, skipNum);
    Article.find({}).skip(skipNum).sort({isTop:-1,_id:1}).limit(adminPageSize).exec(function(err, data) {
        if(err) {
            console.log(err);
        }else {
            res.send(data);
        }
    })
})

router.post('/api/updateArticle',function (req, res, next) {
    var data = req.body;
    Object.keys(data).forEach(function(key) {
        try {data[key] = JSON.parse(data[key])}catch (e) {}
    })
    var articleID = {_id:data._id};
    var updateData = {
        updateTime:data.updateTime,name:data.name,
        type:data.type,intro:data.intro,isTop:data.isTop,
        resource:data.resource,data:data.data
    }
    if(req.body.bgImgName) {
        updateData.bgImgName = req.body.bgImgName;
    }
    Article.update(articleID, updateData,function (err, data) {
        if(err) {
            console.log(err)
        }else {
            res.send({update:true});
        }
    });
})


router.post('/api/newArticle',function (req, res, next) {
    var recData = req.body;
    Object.keys(recData).forEach(function(key) {
        try {recData[key] = JSON.parse(recData[key])}catch (e) {}
    })
    var article = new Article(recData);
    article.save(function (err, data) {
        if(err) {
            console.log(err)
        }else {
            res.send({upload: true});
        }
    });
})


module.exports = router;
