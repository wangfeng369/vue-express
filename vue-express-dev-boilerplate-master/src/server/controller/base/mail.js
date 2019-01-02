const nodemailer = require('nodemailer')

class MailSendBase{
    constructor(){

    }
    static MailSend (mail){
        //创建一个smtp服务器
        const config = {
            host: 'smtp.qq.com',
            secure:true,
            auth: {
                user: '598433771@qq.com', //注册的163邮箱账号
                pass: 'awvyktwjoydlbffh' //邮箱的授权码，不是注册时的密码,等你开启的stmp服务自然就会知道了
            }
        };
        // 创建一个SMTP客户端对象
        const transporter = nodemailer.createTransport(config);
        //发送邮件
        transporter.sendMail(mail, function(error, info){
            if(error) {
                return console.log(error);
            }
            console.log('mail sent:', info.response);
        });
     
    }
}

export default MailSendBase