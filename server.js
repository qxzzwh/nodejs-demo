const http = require("http");
const fs = require("fs");
const sendResponse = (filename, statusCode, response) => {
    fs.readFile(`./html/${filename}`, (error, data) => {
        if (error) {
            response.statusCode = 500;
            response.setHeader("Content-Type", "text/plain");
            response.end("Sorry, internal error");
        } else {
            response.statusCode = statusCode;
            response.setHeader("Content-Type", "text/html");
            response.end(data);
        }
    });
}
const port = 3000;
const ip = "127.0.0.1";
const server = http.createServer((request, response) => {
    // console.log(request.url, request.method);
    const method = request.method;
    let url = request.url;
    if (method === "GET") {
        const requestUrl = new URL(url, `http://${ip}:${port}`);
        console.log(requestUrl);
        url = requestUrl.pathname
        const lang = requestUrl.searchParams.get("lang");
        let selector;
        if (lang === null || lang === "en") {
            selector = "";
        } else if (lang === "zh") {
            selector = "-zh";
        } else {
            selector = "";
        }
        if (url === "/") {
            sendResponse(`index${selector}.html`, 200, response);
        } else if (url === "/about.html") {
            sendResponse(`about${selector}.html`, 200, response);
        } else if (url === "/login.html") {
            sendResponse(`login${selector}.html`, 200, response);
        } else if (url === "/login-success.html") {
            sendResponse(`login-success${selector}.html`, 200, response);
        } else if (url === "/login-fail.html") {
            sendResponse(`login-fail${selector}.html`, 200, response);
        } else {
            sendResponse("404.html", 404, response);
        }

    } else {
        if (url = "/process-login") {
            let body = [];
            request.on("data", (chunk) => {
                body.push(chunk);
            });
            request.on("end", () => {
                body = Buffer.concat(body).toString();
                body = new URLSearchParams(body);
                console.log(body);
                if (body.get("username") === "qxz" && body.get("password") === "qxz123") {
                    response.statusCode = 301;
                    response.setHeader("Location", "/login-success.html");
                } else {
                    response.statusCode = 301;
                    response.setHeader("Location", "/login-fail.html");
                }
                response.end();
            });
        }

    }

    // response.end("Hello From NodeJs Server");
});

server.listen(port, ip, () => {
    console.log(`Server is runing at http://${ip}:${port}`);
});