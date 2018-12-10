 import article from '../../dao/index/index'
 import base from '../base/index'
 const formidable = require("formidable");	
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

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async uploadFoodDetail(req,res,next){
        try{
            console.log(req.files)
            let foodName = req.body.foodName
            let foodCode = req.body.foodCode
            let foodEnName = req.body.foodEnName
            let foodSize = req.body.foodSize
            let deadLine = req.body.deadLine
            let palce = req.body.palce
            let file = req.body.file
            let categoryName = req.body.categoryName
            let productsName = req.body.productsName
            let typeName = req.body.typeName
          
           
            // let pic = req.body.file.name
       
            let productsTypeResult = await article.searchProductsType(req,typeName)
            let createType = -1;
            let productsId = -1;
            let categoryId = -1;
            if(!productsTypeResult){
                let createTypeResult = await article.createProductsType(req,typeName)
                createType = createTypeResult.id
            }else{
                createType = productsTypeResult.id;
            }
            let productsResult = await article.searchProdcts(req,productsName,createType)
            if(!productsResult){
                let productsIdResult = await article.createProdcts(req,productsName,createType)
                productsId = productsIdResult.id
            }else{
                productsId = productsResult.id
            }
            let producsCategoryResult = await article.searchCategory(req,categoryName,productsId)
            if(!producsCategoryResult){
                let producsCategoryIdResult = await article.createFoodCategory(req,categoryName,productsId)
                categoryId = producsCategoryIdResult.id
            }else{
                categoryId = producsCategoryResult.id
            }
            let productsDeatilResult = await article.searchFoodList(req,foodName,categoryId)
           if(!productsDeatilResult){
               let  productsDeatilId = await article.createFoodList(req,foodName,foodCode,foodEnName,foodSize,deadLine,palce,'12312.jpg',categoryId)
               res.send({
                   sucess:0,
                   info:'新增成功'
               })
           }else{
               res.send({
                   sucess:-1,
                   info:'已存在该商品信息'
               })
           }
        }catch(err){
            console.log(err)
            res.send({
                sucess:-1,
                info:'发生未知错误'
            })
        }
    }
    async searchTotalList(req,res,next){
        try{
            let searchTotalListTypeResult = await article.searchListType(req)
            let searchTotalListResult = await article.searchProdctsList(req)
            let searchTotalcategoryListResult = await article.searchcategoryList(req)
            let searchTotalDetailListResult = await article.searchDetailList(req)
            res.send({
                sucess:0,
                data:{
                    listOne: searchTotalListTypeResult,
                    listTwo:searchTotalListResult,
                    listThree:searchTotalcategoryListResult,
                    listDetail:searchTotalDetailListResult
                }
            })
        }catch(err){
            console.log(err)
            res.send({
                sucess:-1,
                info:'发生未知错误'
            })
        }
    }
 }


export default new index