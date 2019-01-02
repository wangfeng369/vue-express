 import article from '../../dao/index/index'
 import base from '../base/index'
 import fs from 'fs'
 const formidable = require("formidable");

 /**
  *
  *
  * @class index
  * @extends {base}
  */
 class index extends base {
     constructor() {
         super()
     }
     /**
      *
      *
      * @param {*} req
      * @param {*} res
      * @param {*} next
      * @memberof index
      */
     async createFile(req, res, next) {
         try {
             super.uploadFile()
         } catch (error) {
             console.log(error)
         }
     }
     /**
      *
      *
      * @param {*} req
      * @param {*} res
      * @param {*} next
      * @memberof index
      */
     async indexArticle(req, res, next) {
         try {
             let result = await article.articleSearch(req)
             res.send({
                 'data': result.rows,
                 totalCount: result.count
             })
         } catch (error) {
             console.log(error)
             res.send({
                 'message': error,
                 code: -1
             })
         }
     }

     /**
      * 
      * @param {*} req 
      * @param {*} res 
      * @param {*} next 
      */
     async uploadFoodDetail(req, res, next) {
         try {
             let changeDetailId = req.body.id
             let foodName = req.body.foodName
             let foodCode = req.body.foodCode
             let foodEnName = req.body.foodEnName
             let foodSize = req.body.foodSize
             let deadLine = req.body.deadLine
             let palce = req.body.palce
             let price = req.body.price
             let detail = req.body.detail
             let file = req.files
             let picArray = []
             let newPic = []
             let pic = ''
             for(let i=0;i<file.length;i++){
                picArray.push(file[i].filename)
             }
             console.log(JSON.stringify(file))
             pic = picArray.join()
             let categoryName = req.body.categoryName
             let productsName = req.body.productsName
             let typeName = req.body.typeName
           
             let productsTypeResult = await article.searchProductsType(req, typeName)
             let createType = -1;
             let productsId = -1;
             let categoryId = -1;
             if (!productsTypeResult) {
                 let createTypeResult = await article.createProductsType(req, typeName)
                 createType = createTypeResult.id
             } else {
                 createType = productsTypeResult.id;
             }
             let productsResult = await article.searchProdcts(req, productsName, createType)
             if (!productsResult) {
                 let productsIdResult = await article.createProdcts(req, productsName, createType)
                 productsId = productsIdResult.id
             } else {
                 productsId = productsResult.id
             }
             let producsCategoryResult = await article.searchCategory(req, categoryName, productsId)
             if (!producsCategoryResult) {
                 let producsCategoryIdResult = await article.createFoodCategory(req, categoryName, productsId)
                 categoryId = producsCategoryIdResult.id
             } else {
                 categoryId = producsCategoryResult.id
             }
             let productsDeatilResult = await article.searchFoodList(req, foodName, categoryId)
             if (productsDeatilResult !='') {
                if(changeDetailId !=''&& changeDetailId !=null&& changeDetailId !=undefined){
                    if(req.body.oldImgList != ''){
                        let oldImgList = req.body.oldImgList.split(',')
                        newPic = oldImgList.concat(pic)
                        newPic = newPic.join()
                    }else{
                        newPic = pic
                    }
                    
                    let changeDetailListResult = await article.updateDetail(changeDetailId,foodName, foodCode, foodEnName, foodSize, deadLine, palce, newPic, price,detail,categoryId)
                    res.send({
                        success: 0,
                        info: '修改成功',
                        result:changeDetailListResult
                    })
                }else{
                    let productsDeatilId = await article.createFoodList(req, foodName, foodCode, foodEnName, foodSize, deadLine, palce, pic, categoryId,price,detail)
                    res.send({
                        success: 0,
                        info: '新增成功'
                    })
                } 
             }else{
                 res.send({
                    success: -1,
                    info: '查询发生错误'
                 })
             }
             
         } catch (err) {
             console.log(err)
             res.send({
                 success: -1,
                 info: '发生未知错误'
             })
         }
     }
     async searchTotalList(req, res, next) {
         try {
             let searchTotalListTypeResult = await article.searchListType()
             
             let searchTotalListResult = await article.searchProdctsList()
             
             let searchTotalcategoryListResult = await article.searchcategoryList()
             let searchTotalDetailListResult = await article.searchDetailList()  
             res.send({
                 sucess: 0,
                 data: {
                     listOne: searchTotalListTypeResult,
                     listTwo: searchTotalListResult,
                     listThree: searchTotalcategoryListResult,
                     listDetail: searchTotalDetailListResult
                 }
             })
         } catch (err) {
             console.log(err)
             res.send({
                 success: -1,
                 info: '发生未知错误'
             })
         }
     }

     async searchTypeProductsList(req,res,next){
        let searchTotalListTypeResult = await article.searchListType()
        let resultArray = []
        let result = await super.CustomForeach(searchTotalListTypeResult,async(items,index) => {
             let searchProductsResult = await article.searchApiProdctsList(items.id)
             if(searchProductsResult!=null){
                items['listTwo'] = searchProductsResult
             }
             
             resultArray.push(items)
         })
         res.send({
             success:0,
             info:'查询成功',
             result:searchTotalListTypeResult
         })
     }
     async searchAdminName(req,res,next){
         try{
            let DetailId = req.body.id
            let pageSize = req.body.pageSize
            let currentPage = req.body.currentPage
            let detailListResult = []
            if(DetailId !=''&& DetailId !=null&& DetailId !=undefined){
                detailListResult = await article.searchDetailIdList(req,DetailId)
                detailListResult.rows = detailListResult
            }else{
                detailListResult = await article.searchDetailListCount(pageSize,currentPage)
            }
            let resultArray = new Array()
            
            let result = await super.CustomForeach(detailListResult.rows,async(items,index) => {
                const categoryNameResult = await article.searchCategoryIdNameList(items.categoryId)
                items['categoryName'] = categoryNameResult.name

                const productsNameResult = await article.searchProdctsIdNameList(categoryNameResult.productsId)
                if(productsNameResult !=null){
                    items['productsName'] = productsNameResult.productName
                    const typeNameResult = await article.searchFirstTypeIdNameList(productsNameResult.typeId)
                    if(typeNameResult!=null){
                            items['typeName'] = typeNameResult.name
                    }
                }
                resultArray.push(items)
            })
            if(DetailId !=''&& DetailId !=null&& DetailId !=undefined){
                res.send({
                    success:0,
                    result:resultArray
                })
            }else{
                res.send({
                    success:0,
                    result:resultArray,
                    count:detailListResult.count
                })
            }

        
         }catch (err) {
             console.log(err)
             res.send({
                 success: -1,
                 info: '发生未知错误'
             })
         }
     }
     async deleteDetail(req,res,next){
         try{
            let detailId = req.body.id
            let result = await article.deleteDetailList(detailId)
            let resultCategory = await article.searchcategoryList()
            let resultDetail = await super.CustomForeach(resultCategory,async(items,index) => {
                let resultSarchDetail = await article.deleteSearchDetail(items.id)
                if(resultSarchDetail == null ||resultSarchDetail == ''){
                    let resultUpdateCategory = await article.deleteUpdateCategory(items.id)
                }
            })
            let resultSearchCategory = await article.searchProdctsList()
            let resuletProdcuts = await super.CustomForeach(resultSearchCategory,async(items,index) => {
                let resultSarchCategory1 = await article.deleteSearchCategory(items.id)
                if(resultSarchCategory1 == null ||resultSarchCategory1 == ''){
                    let resultUpdateProducts = await article.deleteUpdateproducts(items.id)
                }
            })
            let resultSearchType = await article.searchListType()
            let resuletProcuts = await super.CustomForeach(resultSearchType,async(items,index) => {
                let resultSearchProducts = await article.deleteSearchProducts(items.id)
                if(resultSearchProducts == null ||resultSearchProducts == ''){
                    let resultUpdateType = await article.deleteUpdateProductsType(items.id)
                }
            })
            res.send({
                success: 0,
                info:'删除成功'
            })
         }catch(err){
            console.log(err)
            res.send({
                success: -1,
                info: '发生未知错误'
            })
         }
      
     }
     async deleteFile(req,res,next){
        let path = 'upload//'
        let deletFile =path + req.body.deleteFile
        fs.unlink(deletFile,err=>{
            res.send({
                success:0,
                info:'删除成功'
            })
        })
    
     }
 }


 export default new index