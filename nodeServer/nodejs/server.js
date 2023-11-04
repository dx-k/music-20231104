const http = require("http");
const fs = require("fs");
const receiveData = require("./receiveData");
const queryUser = require("./queryUser");
const createUserInfo = require("./createUserInfo");
const UserInfoIsOk = require("./UserInfoIsOk");

const server = http.createServer();
const port = 8865;
server.listen(port,()=>{
    console.log(`服务已开启，请访问http://127.0.0.1:${port}`);
})

server.on("request",(req,res)=>{
    res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Content-type", "application/json;text/plain;");
    res.setHeader("Access-Control-Allow-Origin","*");
    switch(req.method){
        case "GET":
            // 拿到音乐名
            const musicname = decodeURIComponent(req.url).slice(1,-4);
            // 创建音乐信息
            let musicInfo = "";
            new Promise((resolve,reject)=>{
                fs.readFile(`../musicInfo/${musicname}.json`,"utf-8",(err,data)=>{
                    if(err) return reject(err);
                    return resolve(data);
                })
            })
            .then(result=>{
                musicInfo = JSON.parse(result);
                // 查找是否有该音乐
                queryUser(musicname,'../music')
                .then(status=>{
                    if(status){
                        // 如果音乐存在则返回信息
                        if(musicname.length > 4){
                            res.end(JSON.stringify({
                                isExist:status,
                                url:"http://127.0.0.1:8866/replace.m4a",
                                loginPlay:true,
                                musicInfo:musicInfo
                            }));
                            return;
                        }
                        res.end(JSON.stringify({isExist:status,url:"http://127.0.0.1:8866/replace.m4a",musicInfo:musicInfo}));
                    }else{
                        res.end(JSON.stringify({isExist:status,url:""}));
                    }
                })
            })
            
            break;
        case "POST":
            // 接收数据
            receiveData(req)
            .then(result=>{
                const filePath = "../user";
                // 业务拆分：1.注册业务；2.登录业务；3.查询业务
                switch(result.business){
                    case "regin":
                        // 查询用户是否存在
                        queryUser(result.username,filePath)
                        .then(status=>{// 用户存在返回 true 不存在返回false
                            if(status){
                                // 存在直接返回存在信息
                                res.end(JSON.stringify({message:true}));
                            }else if(status === false){
                                // 不存在该用户并且业务是注册时，存储该用户信息
                                if(result.business === "regin"){
                                    createUserInfo(result,filePath)
                                    .then(status=>{
                                        res.end(JSON.stringify({createIsOk:status}));
                                    })
                                    .catch(err=>{
                                        console.log(err.message);
                                    })
                                }
                            }
                        })
                        break;
                    case "login":
                        queryUser(result.username,filePath)
                        .then(status=>{
                            if(status === true){
                                // 判断用户信息是否正确
                                UserInfoIsOk(result,filePath)
                                .then(status=>{
                                    if(status === true){
                                        res.end(JSON.stringify({message:true}));
                                    }
                                })
                            }
                        })
                        break;
                    case "query":
                        queryUser(result.username,filePath)
                        .then(status=>{
                            res.end(JSON.stringify({message:status}));
                        })
                        break;
                    default:
                        res.end("请求业务错误");
                        break;
                }
            })
            break;
        default:
            res.end(JSON.stringify(`请求参数错误：${req.method}`));
            break;
    }
})