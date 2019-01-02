import express from 'express'
const router = express.Router();
import Sequelize from 'sequelize'
import crypto from 'crypto';
const config = require('../config.json');
const utils = require('../common/utils');
import wechatApi from '../common/wechatapi'
import wechatapi from '../common/wechatapi';
const xml2js = require('xml2js')
const wechat = require('wechat')
/* GET home page. */
// router.get('/',utils.sign(config))
let menuConfig = {
	"button":[
		{    
		  "type":"view",
		  "name":"个人博客",
		   "url":"https://www.wangfeng.kim"
		},
		{    
		  "type":"click",
		  "name":"听歌",
		  "key":"music"
		},
		{    
		  "name":"小工具",
		  "sub_button":[{
			   "type": "scancode_waitmsg", 
			   "name": "扫一扫",
			   "key": "scancode"
		  },{
			   "type": "pic_sysphoto", 
			   "name": "系统拍照发图",
				"key": "take_photo"
		  },{
			"type": "location_select", 
			"name": "发送位置",
			"key": "send_location"
		}]
		}
	 ]
}

router.use(function(req,res,next){
    //根据token从redis中获取access_token
	utils.get(config.wechat.token).then(function(data){
		console.log(data)
		//获取到值--往下传递
		if (data) {
			return Promise.resolve(data);
		}
		//没获取到值--从微信服务器端获取,并往下传递
		else{
			return wechatApi.updateAccessToken()
		}
	}).then(function(data){
		//没有expire_in值--此data是redis中获取到的
		if (!data.expires_in) {
			console.log('redis获取到值');
			req.accessToken = data;
			next();
		}
		//有expire_in值--此data是微信端获取到的
		else{
			console.log('redis中无值');
			/**
			 * 保存到redis中,由于微信的access_token是7200秒过期,
			 * 存到redis中的数据减少20秒,设置为7180秒过期
			 */
			utils.set(config.wechat.token,`${data.access_token}`,7180).then(function(result){
				if (result == 'OK') {
					req.accessToken = data.access_token;
					next();
				}
			})
			
		}
	})
		// return wechatApi.createMenu(req.accessToken,menuConfig)

})
// router.get('/',function(req,res,next){
//     console.log(req.accessToken);
//     res.send('sucess')
// });




module.exports = router;