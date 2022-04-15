var express = require('express');
var router = express.Router();

const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog.js');
const { ErrorModel, SuccessModel } = require('../model/resModel.js');
const loginCheck = require('../middleware/loginCheck');

//获取博客列表 
router.get('/list', function (req, res, next) {
    //获取博客列表 
    let author = req.query.author || '';
    const keyword = req.query.keyword || '';
    if (req.query.isadmin) {
        //admin page
        if (req.session.username == null) {
            //not log in yet
            res.json(
                new ErrorModel('Not login yet')
            )
            return;
        }
        //set author to current user.
        author = req.session.username;
    }
    // if (req.query.isadmin) {

    //     //admin page
    //     const loginCheckResult = loginCheck(req);
    //     if (loginCheckResult) {
    //         //not log in yet
    //         return loginCheckResult
    //     }
    //     //set author to current user.
    //     author = req.session.username;
    // }
    const result = getList(author, keyword);
    return result.then(listData => {
        res.json(new SuccessModel(listData))
    })

});

//获取博客详情
router.get('/detail', function (req, res, next) {
    const result = getDetail(req.query.id);
    return result.then(data => {
        res.json(new SuccessModel(data))
    })
})

// 新建一篇博客
router.post('/new', loginCheck, function (req, res, next) {
    req.body.author = req.session.username;
    const result = newBlog(req.body);
    return result.then(data => {
        res.json(new SuccessModel(data));
    })
})

// 更新一篇博客
router.post('/update', loginCheck, function (req, res, next) {
    const result = updateBlog(req.query.id, req.body);
    return result.then(val => {
        if (val) {
            res.json(new SuccessModel())
        } else {
            res.json(new ErrorModel("Update failed!"));
        }
    })
})

// 删除一篇博客
router.post('/update', loginCheck, function (req, res, next) {
    const author = req.session.username;
    const result = delBlog(req.query.id, author);
    return result.then(val => {
        if (val) {
            res.json(new SuccessModel())
        } else {
            res.json(new ErrorModel("Delete failed!"))
        }
    })
})


module.exports = router
