import sequelize from 'sequelize'
const articleDao =  require('../../model/index').article


class article {
    constructor(){

    }
    articleSearch (req) {
        let currentPage = req.body.currentPage
        let pageSize = req.body.pageSize
        let totalCount = 0
        let offset = (currentPage - 1) * pageSize
     
        return articleDao.findAndCountAll({
            offset: offset,
            limit: pageSize
        })
        
    } 
 
   
}

export default new article