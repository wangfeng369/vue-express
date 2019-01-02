let utils = {};
let sha1 = require('sha1');
let request = require('request');
let redis = require("redis");  
let RDS_PORT = 6379
let RDS_HOST = '120.79.213.80'
let RDS_PWD = 'wangfeng123'
let RDS_OPTS = {auth_pass:RDS_PWD}
let client = redis.createClient(RDS_PORT, RDS_HOST,RDS_OPTS);  
  
client.on("error", function (err) {  
  console.log("Error :" , err);  
});  
  
client.on('connect', function(){  
  console.log('Redis连接成功.');  
}) 
 
//检查微信签名认证中间件
utils.sign = function (config){
	return function(req, res, next){
		config = config || {};
		let q = req.query;
        let token = config.wechat.token;
        let signature = q.signature; //微信加密签名
		let nonce = q.nonce; //随机数
		let timestamp = q.timestamp; //时间戳
		let echostr = q.echostr; //随机字符串
		console.log('~!~~~~~~~~~~~')
		/*
		 	1）将token、timestamp、nonce三个参数进行字典序排序
			2）将三个参数字符串拼接成一个字符串进行sha1加密
			3）开发者获得加密后的字符串可与signature对比，标识该请求来源于微信
		*/
		let str = [token, timestamp, nonce].sort().join('');
		let sha = sha1(str);
		if (req.method == 'GET') {
 
			if (sha == signature) {
				res.send(echostr+'')
			}else{
				res.send('err');
			}
		}
		else if(req.method == 'POST'){
			if (sha != signature) {
				return;
			}
			next();
		}
	}
};
 
/** 
 * 添加string类型的数据 
 * @param key 键 
 * @params value 值  
 * @params expire (过期时间,单位秒;可为空，为空表示不过期) 
 */  
utils.set = function(key, value, expire){  
 
	return new Promise(function(resolve, reject){
  
    client.set(key, value, function(err, result){  
  
      if (err) {  
        console.log(err);  
        reject(err);
        return;  
      }  
 
      if (!isNaN(expire) && expire > 0) {  
        client.expire(key, parseInt(expire));  
      }  
 
      resolve(result); 
    }) 
  }) 
};  
  
/** 
 * 查询string类型的数据 
 * @param key 键 
 */  
utils.get = function(key){  
 
	return new Promise(function(resolve, reject){
  
    client.get(key, function(err,result){  
  
      if (err) {  
        console.log(err);  
        reject(err);  
        return;  
      }  
 
      resolve(result);  
    }); 
  }) 
};  
 
//Promise化request
utils.request = function(opts){
	opts = opts || {};
	return new Promise(function(resolve, reject){
		request(opts,function(error, response, body){
			if (error) {
				console.log(error)
				return reject(error);
			}
			resolve(body);
		})
		
	})
 
};
let createNonceStr = function(){
	return Math.random().toString(36).substr(2,15)
}
let createTimestamp = function () {
  return parseInt(new Date().getTime() / 1000) + '';
};
let raw = function (args) {
  var keys = Object.keys(args);
  keys = keys.sort();
  var newArgs = {};
  keys.forEach(function (key) {
    newArgs[key.toLowerCase()] = args[key];
  });

  var string = '';
  for (var k in newArgs) {
    string += '&' + k + '=' + newArgs[k];
  }
	
	string = string.substr(1);
	
	return string;
};
	/**
* @synopsis 签名算法 
*
* @param jsapi_ticket 用于签名的 jsapi_ticket
* @param url 用于签名的 url ，注意必须动态获取，不能 hardcode
*
* @returns
*/
utils.sign = function(jsapi_ticket, url){
  let ret = {
    jsapi_ticket: jsapi_ticket,
    nonceStr: createNonceStr(),
    timestamp: createTimestamp(),
    url: url
  };
  let string = raw(ret);
  let jsSHA = require('jssha');
	let shaObj = new jsSHA('SHA-1','TEXT');
	shaObj.update(string)
  ret.signature = shaObj.getHash('HEX');
  console.log('~~~~~~~'+ ret)
  return ret;
}
module.exports = utils;