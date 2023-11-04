const fs = require("fs");
/**
 * 
 * @param { String } filename 文件名，不包含后缀名
 * @param { String } url 指定在哪个文件夹中查找
 * @returns 
 */
module.exports =  function queryUser(name,url){
    return new Promise((resolve,reject)=>[
        // readdir用于异步读取给定目录的所有文件名。files为所有文件名组成的数组
        fs.readdir(url,(err,files)=>{
            // 访问文件夹或文件错误
            if(err) return reject(err);
            // 如果files是一个空数组，那么就返回 false ，表示没有这个用户
            if(files[0] === undefined) return resolve(false);
            files.forEach(e=>{
                const index = e.lastIndexOf('.');
                // 如果存在该用户，则返回true，表示有该用户
                if(e.substring(0,index) == name){
                    return resolve(true);
                }
            })
            // 所有文件查询完毕后，没有该用户则返回false
            return resolve(false);
        })
    ])
}