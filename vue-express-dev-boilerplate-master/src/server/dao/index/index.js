import sequelize from 'sequelize'
const articleDao =  require('../../model/index').article
const products =  require('../../model/index').products
const productCategory = require('../../model/index').productCategory
const productDetail = require('../../model/index').productDetail
const productType = require('../../model/index').productType
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
    searchProductsType(req,typeName,typeId){
        return productType.findOne({
            where:{
                name: typeName
            }
        })
    }
    createProductsType(req,typeName,typeId){
        return productType.create({
            name:typeName
        })
    }
    searchProdcts(req,productsName,typeId){
        return products.findOne({
            where:{
                productName:productsName,
                typeId :typeId
            }
        })
    }
    createProdcts(req,productsName,createType){
        return products.create({
            typeId :createType,
            productName:productsName,
            
        })
    }
    searchCategory(req,categoryName,productsId){
        return productCategory.findOne({
            where:{
                name:categoryName,
                productsId :productsId
            }
        })
    }
    createFoodCategory(req,categoryName,productsId){
        return productCategory.create({
            productsId:productsId,
            name:categoryName
        })
    }
    searchFoodList(req,foodName,categoryId){
        return productDetail.findOne({
            where:{
                name:foodName,
                categoryId :categoryId
            }
        })
    }
    createFoodList(req,foodName,foodCode,foodEnName,foodSize,deadLine,palce,pic,categoryId){
        return productDetail.create({
            name:foodName,
            englishName:foodEnName,
            code:foodCode,
            size:foodSize,
            deadline:deadLine,
            place:palce,
            pic:pic,
            categoryId:categoryId
        })
    }
    searchListType(req){
        return productType.findAll()
    }
    searchProdctsList(req){
        return products.findAll()
    }
    searchcategoryList(req){
        return productCategory.findAll()
    }
    searchDetailList(req){
        return productDetail.findAll()
    }
}

export default new article