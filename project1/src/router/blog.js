const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog.js')
const { ErrorModel, SuccessModel } = require('../model/resModel.js')

//login check
const loginCheck = (req) => {
    if (!req.session.username) {
        return Promise.resolve(
            new ErrorModel("Not login yet")
        );
    }
}


const handleBlogRouter = (req, res) => {
    const id = req.query.get('id');

    //获取博客列表 
    if (req.method === 'GET' && req.path === '/api/blog/list') {
        const author = req.query.get("author");
        const keyword = req.query.get("keyword");
        const result = getList(author, keyword);
        return result.then(listData => {
            return new SuccessModel(listData);
        })

    }
    //获取博客详情
    if (req.method === 'GET' && req.path === '/api/blog/detail') {
        const result = getDetail(id);
        return result.then(data => {
            return new SuccessModel(data);
        });
    }
    // 新建一篇博客
    if (req.method === 'POST' && req.path === '/api/blog/new') {
        const loginCheckResult = loginCheck(req);
        if (loginCheckResult) {
            // not log in yet
            return loginCheck;
        }
        req.body.author = req.session.username;
        const result = newBlog(req.body);
        return result.then(data => {
            return new SuccessModel(data);
        })
    }
    // 更新一篇博客
    if (req.method === 'POST' && req.path === '/api/blog/update') {
        const loginCheckResult = loginCheck(req);
        if (loginCheckResult) {
            // not log in yet
            return loginCheck;
        }
        const result = updateBlog(id, req.body);
        return result.then(val => {
            if (val) {
                return new SuccessModel();
            } else {
                return new ErrorModel("Update failed!")
            }
        })
    }
    // 删除一篇博客
    if (req.method === 'POST' && req.path === '/api/blog/del') {
        const loginCheckResult = loginCheck(req);
        if (loginCheckResult) {
            // not log in yet
            return loginCheck;
        }
        const author = req.session.username;
        const result = delBlog(id, author);
        return result.then(val => {
            if (val) {
                return new SuccessModel();
            } else {
                return new ErrorModel("Delete failed!")
            }
        })
    }
}
module.exports = handleBlogRouter