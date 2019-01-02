import User from '../../dao/index/user'
import base from '../base/index'
import Tools from '../base/tools'
import nodemail from '../base/mail'

class user extends base{
    constructor(){
        super()
    }
    async sendEmail(req,res,next){
        let email = req.body.email;//刚刚从前台传过来的邮箱

        console.log(email)
        let userName = req.body.userName;//刚刚从前台传过来用户名
        let password = req.body.password
        let code = await Tools.createSixNum();//这里是我写的生成的随机六位数，等等下面给代码
        let date = new Date();//获取当前时间
        let isLive = 0;
        //去数据库中找有没有同名的用户名，这里就要自己写了，不同的数据库查询方法不同
        let result =await User.searchUserName(userName)
        console.log(result)
        //console.log(result);
        if(result){
            res.send({
                success:false,message:"账号已经存在"
            })
        }else{
            let mail = {
                // 发件人
                from: '<598433771@qq.com>',
                to:email,//前台传过来的邮箱,
                // 主题
                subject: '验证码',//邮箱主题
                // 邮件内容，HTML格式
                html: '您的验证码是<b>'+code +'</b>！'//发送验证码
            };
     
            await User.insertUserName(userName,email,code,date,isLive);//将获取到的验证码存进数据库，待会提交时要检查是不是一致
            await nodemail.MailSend(mail);//发送邮件
            res.send({
                success:true,message:"账号可行"
            })
        }
    }
    async registerAccount(req,res,next){
        let userName = req.body.userName
        let password = req.body.password
        let code = req.body.code
        let isLive = 1
        let newDate = (new Date()).getTime()
        let nowDate = new Date()
        let nowDateResult = Tools.formatgetTime(nowDate)
        console.log('1111'+nowDateResult)
        console.log((new Date()).getTime())
        let result = await User.searchCodeDateIslive(userName)
        console.log(result.createTime.getTime())
        if(result.code === code&&result.createTime.getTime() - newDate <600000){
            let updateResult = await User.createAccountPassword(userName,password,isLive,nowDateResult)
            res.send({
                success:true,
                info:"注册成功"
            })
        }else{
            res.send({
                success:false,
                info:"验证码失效或过期"
            })
        }

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
                    bgpic = bg[0].filename
                }
            }
            if(logo == undefined ||logo == null ||logo == '' ){
                logopic = ''
            }else{
                for(let k=0;k<logo.length;k++){
                    logopic = logo[0].filename
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