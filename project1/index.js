const http = require("http");
const fs = require("fs");

const port = 3000;
const ip = "127.0.0.1";
const server = http.createServer((request, response) => {
    const method = request.method;
    const url = new URL(request.url, `http://${ip}:${port}`);
    const path = url.pathname;
    const search = url.search;
    const query = new URLSearchParams(url.search);

    response.setHeader('Content-type', 'application/json');
    let responseData = {
        method,
        url,
        path,
        search,
        query
    };

    if (method === 'GET') {
        response.end(
            JSON.stringify(responseData)
        );
    }
    if (method === 'POST') {
        // let postData = [];
        // request.on("data", (chunk) => {
        //     postData.push(chunk);
        // });
        let postData = ""
        request.on("data", (chunk) => {
            postData += chunk.toString();
        });
        request.on("end", () => {
            responseData.postData = postData;
            response.end(JSON.stringify(responseData));
        });


    }
});

server.listen(port, ip, () => {
    console.log(`Server is runing at http://${ip}:${port}`);
});