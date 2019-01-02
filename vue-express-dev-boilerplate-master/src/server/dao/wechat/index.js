const User = require('../../model/index').user
class wechatDao{
    constructor(){

    }
    async searchUserOpenId(openId){
        return User.findOne({
            attributes:['openId'],
            where:{
                openId:openId
            }
        })
    }
    async createUserOpenId(openId){
        return User.create({
            openId:openId,
            password:'654321'
        })
    }
    async updateUserOpenId(openId){
        return User.update({
            openId:openId,
            password:'654321'
        })
    }
}

export default new wechatDao