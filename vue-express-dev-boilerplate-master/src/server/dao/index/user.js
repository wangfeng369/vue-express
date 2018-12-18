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
    }
}

export default new userDao