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
}

export default new userDao