const fs = require("fs");
/**
 * 
 * @param {用户名} username 
 * @param {路径} path 
 */
module.exports = function UserInfoIsOk(webData,path){
    return new Promise((resolve,reject)=>{
        fs.readFile(`${path}/${webData.username}.json`,"utf-8",(err,data)=>{
            if(err) return reject(err);
            const nodeData = JSON.parse(data);
            if(webData.password === nodeData.password && webData.email === nodeData.email){
                return resolve(true);
            }
        })
    })
}