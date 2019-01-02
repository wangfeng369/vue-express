/*
 *微信相关操作api
 */
import common from '../controller/base/index'
import userDao from '../dao/wechat/index'
let config = require('../config.json');
let appID = config.wechat.appID;
let appSecret = config.wechat.appSecret;
let utils = require('./utils');
var CircularJSON = require('circular-json');
let api = {
	accessToken: `${config.wechat.prefix}token?grant_type=client_credential`,
	upload: `${config.wechat.prefix}media/upload?`,
	createMenu: `${config.wechat.menuPrefix}create`,
	getWxlogin: `${config.wechat.getWxLogin}authorize?`,
}
class wechatApi extends common{
	constructor() {
		super()
		this.getUserInfo = this.getUserInfo.bind(this)
		this.getWxAuthAcessToken = this.getWxAuthAcessToken.bind(this)
		this.getWxTicket = this.getWxTicket.bind(this)
		this.getSign = this.getSign.bind(this)
		this.sendTemplete = this.sendTemplete.bind(this)
		this.saveOpenId = this.saveOpenId.bind(this)
	}
	async updateAccessToken() {
		try{
			let url = `${api.accessToken}&appid=${appID}&secret=${appSecret}`;
			let option = {
				url: url,
				json: true
			};
			return utils.request(option).then(function (data) {
	
				return Promise.resolve(data);
			})	
		}
		catch(err){
			console.log(err)
			next()
		}
		
	}

	async createMenu(accessToken, data) {
		try{
			let url = `${api.createMenu}?access_token=${accessToken}`;
			let option = {
				url: url,
				method: "POST",
				json: true,
				headers: {
					"content-type": "application/json",
				},
				body: data
			}
			console.log('!!!!!!!' + JSON.stringify(option));
			return utils.request(option).then(function (data) {
				return Promise.resolve(data);
	
			})
		}
		catch(err){
			console.log(err)
			next()
		}
		
	}
	async wxLogin(req, res, next) {
		try{
			let router = 'wechat/getWxAuthAcessToken'
			let return_url = 'http://120.79.213.80/' + router
			let scope = 'snsapi_userinfo'
			let url = `${api.getWxlogin}appid=${appID}&redirect_uri=${return_url}&response_type=code&scope=${scope}&state=STATE#wechat_redirect`
			res.redirect(url)
		}
		catch(err){
			console.log(err)
			next()
		}
		
	}
	async getWxAuthAcessToken(req, res, next) {
		try{
			console.log(req.query)
			let code = req.query.code
			let url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${appID}&secret=${appSecret}&code=${code}&grant_type=authorization_code`
			let option = {
				url: url,
				json: true
			}
			return utils.request(option).then(data => {
				let result = data
				let authAcessToken = result.access_token
				let openId = result.openid
				console.log(authAcessToken+'&'+openId)
			
				let url = `https://api.weixin.qq.com/sns/userinfo?access_token=${authAcessToken}&openid=${openId}&lang=zh_CN`
				let option = {
					url:url,
					json:true
				}
				return utils.request(option).then(data=>{	
				//	this.sendTemplete(openId,req)
					this.saveOpenId(openId)
					res.redirect('https://www.wangfeng.kim')
				})
				 //let userInfo = this.getUserInfo(authAcessToken,openId)
				
			}).catch(err => {
				console.log(err)
				res.send('失败')
			})
		}
		catch(err){
			console.log(err)
			next()
		}
		
	}
	async getUserInfo(authAcessToken,openId){
		try{
			let url = `https://api.weixin.qq.com/sns/userinfo?access_token=${authAcessToken}&openid=${openId}&lang=zh_CN`
			let option = {
				url:url,
				json:true
			}
			let result = await utils.request(option)
			return result
		}
		catch(err){
			console.log(err)
			next();
		}
				
	}
	async getWxTicket(accessToken){
		try{
			let url = `https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${accessToken}&type=jsapi`
			let option ={
				url:url,
				json:true
			}
			return utils.request(option)
		
		}
		catch(err){
			console.log(err)
		}
	}
	async getSign(req,res,next){
		try{
			let url = req.body.url
			return this.getWxTicket(req.accessToken).then(data=>{
				console.log(url)
				let result = utils.sign(data.ticket,url)
				console.log('ticket:'+data.ticket)
				console.log('url:'+url)
				console.log('other:'+JSON.stringify(result))
				res.send({nonceStr:result.nonceStr,timestamp:result.timestamp,url:result.url,signature:result.signature,appId:appID})
			})
	
		}	
		catch(err){
			console.log(err)
		}
	}
	async sendTemplete(openId,req){
		try{
			let accessToken = req.accessToken
			let openIdList = ["o_JIW1lbOzu3So8iK8up1PWIeH1M","o_JIW1vSFHJ1mEHT70PUkN9XDo_8"]
			let url = `https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=${accessToken}`; //发送模板消息的接口
			super.CustomForeach(openIdList,async(items,index)=>{
				const requestData = { //发送模板消息的数据
					touser:items,
					template_id: 'i4qXQ8CysW8Hxxt-NRYdH_FVLW8pSGyeeJK5Izu0kHQ',
					url: 'http://weixin.qq.com/download',
					data: {
						first: {
							value: '身份信息',
							color: "#173177"
						},
						keyword1: {
							value: '张三',
							color: '#1d1d1d'
						},
						keyword2: {
							value: '男',
							color: '#1d1d1d'
						},
						keyword3: {
							value: '45',
							color: '#1d1d1d'
						},
						remark: {
							value: '已登记！',
							color: '#173177'
						}
					}
				};
				let reuslt = await utils.request({
					url:url,
					method:'POST',
					json:true,
					body:requestData,
					headers: {
						"content-type": "application/json",
					},
				})
				console.log(JSON.stringify(reuslt))
			})
		
		}
		catch(err){
			console.log(err)
		}
	}
	async saveOpenId(openId){
		let reuslt = await userDao.searchUserOpenId(openId)
		if(null == reuslt||''==reuslt||undefined == reuslt){
			let openIdResult =  await userDao.createUserOpenId(openId)
		}
		
	}
}

export default new wechatApi