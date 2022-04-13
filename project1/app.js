const handleUserRouter = require('./src/router/user.js')
const handleBlogRouter = require('./src/router/blog.js')
//Get cookie expire time
const getCookieExpires = () => {
    const d = new Date();
    d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
    return d.toUTCString();
}
// const { reject, chunk } = require('lodash')
const SESSION_DATA = {};
const getPostData = (req) => {
    const promise = new Promise((resolve, reject) => {
        if (req.method !== 'POST') {
            resolve({});
            return;
        }
        console.log(req.headers['content-type'])
        if (req.headers['content-type'] !== 'application/json') {
            resolve({});
            return;
        }
        let postData = ""
        req.on("data", (chunk) => {
            postData += chunk.toString();
        });
        req.on('end', () => {
            if (!postData) {
                resolve({});
                return;
            }
            resolve(
                JSON.parse(postData)
            )
        })
    })
    return promise;
}

const serverHandle = (req, res) => {
    // set return format JSON
    res.setHeader('Content-type', 'application/json');
    const port = 3000;
    const ip = "127.0.0.1";
    const url = new URL(req.url, `http://${ip}:${port}`);
    req.path = url.pathname;
    //解析query
    const search = url.search;
    const query = new URLSearchParams(url.search);
    req.query = query;
    //解析Cookie
    req.cookie = {}
    const cookieString = req.headers.cookie || ""; //k1=v1; k2=v2 ...
    cookieString.split(';').forEach(item => {
        if (!item) {
            return;
        }
        const arr = item.split('=');
        const key = arr[0].trim();
        const val = arr[1].trim();
        req.cookie[key] = val;
    });
    //解析session
    let needSetCookie = false;
    let userId = req.cookie.userid;
    if (userId) {
        if (!SESSION_DATA[userId]) {
            SESSION_DATA[userId] = {};
        }
    } else {
        needSetCookie = true;
        userId = `${Date.now()}_${Math.random()}`;
        SESSION_DATA[userId] = {};
    }
    req.session = SESSION_DATA[userId];
    //处理 POST Data

    getPostData(req).then(postData => {
        req.body = postData;
        //处理blog data
        const blogResult = handleBlogRouter(req, res);
        if (blogResult) {
            blogResult.then(blogData => {
                if (needSetCookie) {
                    res.setHeader('Set-Cookie', `userid=${userId};path=/;httponly;expires=${getCookieExpires()}`);
                }
                res.end(JSON.stringify(blogData));
            })
            return;
        }
        //处理user login
        const userResult = handleUserRouter(req, res);
        if (userResult) {
            userResult.then(userData => {
                if (needSetCookie) {
                    res.setHeader('Set-Cookie', `userid=${userId};path=/;httponly;expires=${getCookieExpires()}`);
                }
                res.end(JSON.stringify(userData));
            })
            return;
        }
        res.writeHead(404, { "Content-type": "text/plain" });
        res.write("404 Not Found\n");
        res.end();
    })
}
module.exports = serverHandle
// env: process.env.NODE_ENV