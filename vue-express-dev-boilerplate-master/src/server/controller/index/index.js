 import article from '../../dao/index/index'
 import base from '../base/index'
 const formidable = require("formidable");
 class index extends base {
     constructor() {
         super()
     }
     async createFile(req, res, next) {
         try {
             super.uploadFile()
         } catch (error) {
             console.log(error)
         }
     }
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
             let pic = ''
             console.log(req.files)
             for(let i=0;i<file.length;i++){
                picArray.push(file[i].originalname)
             }
             pic = picArray.join()
             console.log(pic)
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
             console.log(productsDeatilResult)
             if (productsDeatilResult !='') {
                if(changeDetailId !=''&& changeDetailId !=null&& changeDetailId !=undefined){
                    // let changeDetailListResult = await article.searchOneDetailIdList(changeDetailId)
                    // changeDetailListResult.name = foodName
                    // changeDetailListResult.englishName = foodEnName
                    // changeDetailListResult.code = foodCode
                    // changeDetailListResult.size = foodSize
                    // changeDetailListResult.deadline = deadLine
                    // changeDetailListResult.place = palce
                    // changeDetailListResult.pic = pic
                    // let resulet = await changeDetailListResult.save()
                    let changeDetailListResult = await article.updateDetail(changeDetailId,foodName, foodCode, foodEnName, foodSize, deadLine, palce, pic, price,detail,categoryId)
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
             let searchTotalListTypeResult = await article.searchListType(req)
             let searchTotalListResult = await article.searchProdctsList(req)
             let searchTotalcategoryListResult = await article.searchcategoryList(req)
             let searchTotalDetailListResult = await article.searchDetailList(req)
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
     async searchAdminName(req,res,next){
         try{
            let DetailId = req.body.id
            let detailListResult = []
            if(DetailId !=''&& DetailId !=null&& DetailId !=undefined){
                detailListResult = await article.searchDetailIdList(req,DetailId)
            }else{
                detailListResult = await article.searchDetailList(req)
            }
            let resultArray = new Array()
          
            const CustomForeach = async (arr, callback) => {
                const length = arr.length;
                const O = Object(arr);
                let k = 0;
                while (k < length) {
                  if (k in O) {
                    const kValue = O[k];
                    await callback(kValue, k, O);
                  }
                  k++;
                }
            };
            let result = await CustomForeach(detailListResult,async(items,index) => {
                const categoryNameResult = await article.searchCategoryIdNameList(items.categoryId)
                items['categoryName'] = categoryNameResult.name
                const productsNameResult = await article.searchProdctsIdNameList(categoryNameResult.productsId)
                items['productsName'] = productsNameResult.productName
                const typeNameResult = await article.searchFirstTypeIdNameList(productsNameResult.typeId)
                items['typeName'] = typeNameResult.name
                resultArray.push(items)
            })

            res.send({
                success:0,
                result:resultArray
            })
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
            res.send({
                success: 0,
                info:'删除成功'
            })
         }catch(err){
            res.send({
                success: -1,
                info: '发生未知错误'
            })
         }
      
     }
 }


 export default new index