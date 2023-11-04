const http = require("http");
const url = require("url");
const getMusic = require("./getMusic");
const server = http.createServer();
const post = 8866;
server.listen(post,()=>{
    console.log(`服务开启成功，请访问http://127.0.0.1:8866`);
})

server.on("request",(req,res)=>{
    res.setHeader("Access-Control-Allow-Headers", " Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Content-type", "application/json;text/plain;");
    res.setHeader("Access-Control-Allow-Origin", "*");

    const q = url.parse(req.url, true);
    getMusic(q.path,res);
})