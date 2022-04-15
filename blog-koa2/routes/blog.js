const router = require('koa-router')()
router.prefix('/api/blog')

const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog.js');
const { ErrorModel, SuccessModel } = require('../model/resModel.js');
const loginCheck = require('../middleware/loginCheck');

router.get('/list', async (ctx, next) => {
    //获取博客列表 
    let author = ctx.query.author || '';
    const keyword = ctx.query.keyword || '';
    if (ctx.query.isadmin) {
        //admin page
        if (ctx.session.username == null) {
            //not log in yet
            ctx.body = new ErrorModel('Not login yet');
            return;
        }
        //set author to current user.
        author = ctx.session.username;
    }

    const listData = await getList(author, keyword);
    ctx.body = new SuccessModel(listData);
})

router.get('/detail', async (ctx, next) => {
    const data = await getDetail(ctx.query.id);
    ctx.body = new SuccessModel(data);
})

router.post('/new', loginCheck, async (ctx, next) => {
    const body = ctx.request.body;
    body.author = ctx.session.username;
    const data = await newBlog(req.body);
    ctx.body = new SuccessModel(data);
})

router.post('/update', loginCheck, async (ctx, next) => {
    const val = await updateBlog(ctx.query.id, ctx.requst.body);
    if (val) {
        ctx.body = new SuccessModel();
    } else {
        ctx.body = new ErrorModel("Update failed!")
    }
})

router.post('/delete', loginCheck, async (ctx, next) => {
    const author = ctx.session.username;
    const val = await delBlog(ctx.query.id, author);
    if (val) {
        ctx.body = new SuccessModel();
    } else {
        ctx.body = new ErrorModel("Delete failed!")
    }
})

// router.get('/string', async (ctx, next) => {
//     ctx.body = 'koa2 string'
// })

// router.get('/json', async (ctx, next) => {
//     ctx.body = {
//         title: 'koa2 json'
//     }
// })

module.exports = router
