const User = require('../../model/index').user
class userDao{
    constructor(){

    }
 

    async searchUserImageDao(){
        return User.findOne({
            attributes:['bgImage','logo','title'],
            where:{
                id:1
            }
        })
    }

    async createOrUpdateUserImageDao(bgImage,logo,title){
        if(bgImage != ''&&logo!=''){
            return User.update({
                bgImage:bgImage,
                logo:logo,
                title:title
            },{
                where:{
                    id:1
                }
            }
            )
        }else if(bgImage == ''){
            return User.update({
                logo:logo,
                title:title
            },{
                where:{
                    id:1
                }
            }
            )
        }else if(logo == ''){
            return User.update({
                bgImage:bgImage,
                title:title
            },{
                where:{
                    id:1
                }
            }
            )
        }else{
            return User.update({
                title:title
            },{
                where:{
                    id:1
                }
            }
            )
        }
   
    }
    async searchUserName(userName){
        return User.find({
            where:{
                userName:userName
            }
        })
    }
    async insertUserName(userName,email,code,date,isLive){
        return User.create({
            userName:userName,
            email:email,
            code:code,
            createTime:date,
            isLive:isLive
        })
    }
    async searchCodeDateIslive(userName){
        return User.findOne({
            where:{
                userName:userName
            },
            raw :true
        })
    }
    async createAccountPassword(userName,password,isLive,date){
        return User.update({
            password:password,
            isLive:isLive,
            createTime:date
        },{
            where:{
                userName :userName
            }
        }
          
        )
    }
}

export default new userDao