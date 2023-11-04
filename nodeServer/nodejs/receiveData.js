/**
 * 
 * @param {请求体} req 
 * @returns 
 */
module.exports = function receiveData(req){
    return new Promise((resolve,reject)=>{
         // 用于存放接收的数据
        let data = "";
        req.on("data", (chunk) => {
            data += chunk;
        });
        req.on("end", () => {
            data = JSON.parse(data);
            return resolve(data);
        })
    })
}