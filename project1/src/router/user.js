const { set } = require('../../../blog-express/app.js');
const { login } = require('../controller/user.js');
const { ErrorModel, SuccessModel } = require('../model/resModel.js')
const handleUserRouter = (req, res) => {
    //登录
    // if (req.method === 'POST' && req.path === '/api/user/login') {
    if (req.method === 'POST' && req.path === '/api/user/login') {
        const { username, password } = req.body;
        // const username = req.query.get('username');
        // const password = req.query.get('password');
        const result = login(username, password);
        return result.then(data => {
            if (data.username) {
                //set session
                req.session.username = data.username;
                req.session.realname = data.realname;
                // set(req.sessionId, req.session);
                // console.log(req.session);
                return new SuccessModel();
            } else {
                return new ErrorModel("登录失败");
            }
        })
    }
    // if (req.method === 'GET' && req.path === '/api/user/login-test') {
    //     if (req.session.username) {
    //         return Promise.resolve(
    //             new SuccessModel(
    //                 { session: req.session }
    //             )
    //         );
    //     }
    //     return Promise.resolve(new ErrorModel("Not login yet"));
    // }
}
module.exports = handleUserRouter