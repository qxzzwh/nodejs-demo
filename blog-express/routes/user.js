var express = require('express');
var router = express.Router();
const { login } = require('../controller/user')
const { ErrorModel, SuccessModel } = require('../model/resModel.js')

/* GET users listing. */
router.post('/login', function (req, res, next) {
    const { username, password } = req.body;
    const result = login(username, password);
    return result.then(data => {
        if (data.username) {
            //set session
            req.session.username = data.username;
            req.session.realname = data.realname;
            // console.log(req.session);
            res.json(
                new SuccessModel()
            )
            // return;
        } else {
            res.json(
                new ErrorModel("登录失败")
            )
        }
    })
});

router.get('/login-test', (req, res, next) => {
    if (req.session.username) {
        res.json({
            errno: 0,
            msg: 'logged in'
        })
    } else {
        es.json({
            errno: -1,
            msg: ' not login yet'
        })
    }
})

// router.get('/session-test', (req, res, next) => {
//     const session = req.session
//     if (session.viewNum == null) {
//         session.viewNum = 0
//     }
//     session.viewNum++
//     res.json({
//         viewNum: session.viewNum
//     })
// })

module.exports = router;