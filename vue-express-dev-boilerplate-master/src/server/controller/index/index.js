 import article from '../../dao/index/index'
 const articleDao =  require('../../model/index').article
 import sequelize from 'sequelize'
 class index {
     constructor (){

    }
     async indexArticle (req,res,next) {
         try{
           let result = await article.articleSearch(req)
            res.send({
                'data':result.rows,
                totalCount:result.count
            })
         }catch(error){
             console.log(error)
            res.send({'message':error,code:-1})
        }  
    }
 }


export default new index