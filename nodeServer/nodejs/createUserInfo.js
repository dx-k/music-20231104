const fs = require("fs");

/**
 * 
 * @param {将前端所有数据传递进来即可} data 
 * @param {用户数据的存储位置} path 
 * @returns 
 */
module.exports = function createUserInfo(data,path){
    let _data = JSON.stringify({
        username:data.username,
        password:data.password,
        email:data.email
    });
    return new Promise((resolve,reject)=>{
        fs.writeFile(`${path}/${data.username}.json`,_data,err=>{
            if(err) return reject(err);
            return resolve(true);
        })
    })
}