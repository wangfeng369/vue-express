import User from '../../dao/index/user'
import base from '../base/index'


class user extends base{
    constructor(){
        super()
    }

    async searchUserImage(req,res,next){
        try{
            let result = await User.searchUserImageDao()
            res.send({
                success:0,
                result:result
            })
        }
        catch(err){
            console.log(err)
            res.send({
                success:-1,
                info:err
            })
        }
    }
    async createOrUpdateImage(req,res,next){
        try{
            let bgpic = ''
            let logopic = ''
            let bg = req.files.bg
            let logo = req.files.logo
            let title = req.body.title
            if(bg == undefined ||bg == null ||bg == ''){
                bgpic = ''
            }else{
                for(let i=0;i<bg.length;i++){
                    bgpic = bg[0].originalname
                }
            }
            if(logo == undefined ||logo == null ||logo == '' ){
                logopic = ''
            }else{
                for(let k=0;k<logo.length;k++){
                    logopic = logo[0].originalname
                }
            }
            let result = await User.createOrUpdateUserImageDao(bgpic,logopic,title)
            res.send({
                success:0,
                result : result
            })
        }
        catch(err){
            console.log(err)
            res.send({
                success:-1,
                info:err
            })
        }
    }
}

export default new user