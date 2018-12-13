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
                typeId :typeId,
                isDel:0
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
                productsId :productsId,
                isDel:0
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
                categoryId :categoryId,
                isDel:0
            }
        })
    }
    createFoodList(req,foodName,foodCode,foodEnName,foodSize,deadLine,palce,pic,categoryId,price,detail){
        return productDetail.create({
            name:foodName,
            englishName:foodEnName,
            code:foodCode,
            size:foodSize,
            deadline:deadLine,
            place:palce,
            pic:pic,
            categoryId:categoryId,
            price:price,
            detail:detail
        })
    }
    searchListType(req){
        return productType.findAll({
            where:{
                isDel:0
            }
        })
    }
    searchProdctsList(req){
        return products.findAll({
            where:{
                isDel:0
            }
        })
    }
    searchcategoryList(req){
        return productCategory.findAll({
            where:{
                isDel:0
            }
        })
    }
    searchDetailList(req){
        return productDetail.findAll({
            raw:true,
            where:{
                isDel:0
            }
        })
    }
    searchDetailIdList(req,id){
        return productDetail.findAll({
            raw:true,
            where:{
                id:id,
                isDel:0
            }
        })
    }
    searchOneDetailIdList(id){
        return productDetail.findOne({
            raw:true,
            where:{
                id:id,
                isDel:0
            }
        })
    }
    searchCategoryIdNameList(id){
        return productCategory.findOne({
            where:{
                id:id,
                isDel:0
            },
            raw:true
        })
    }
    searchProdctsIdNameList(id){
        return products.findOne({
            where:{
                id:id,
                isDel:0
            },
            raw:true
        })
    }
    searchFirstTypeIdNameList(id){
        return productType.findOne({
            where:{
                id:id,
                isDel:0
            },
            raw:true
        })
    }
    updateDetail(id,foodName,foodCode,foodEnName,foodSize,deadLine,palce,pic,price,detail,categoryId){
        return productDetail.update({
            name : foodName,
            code : foodCode,
            englishName : foodEnName,
            size : foodSize,
            deadline : deadLine,
            place : palce,
            pic : pic,
            price:price,
            detail:detail
        },{
            where:{
                id : id
            }
        }
        )
    }
    deleteDetailList(id){
        return productDetail.update({
            isDel :1
        },{
            where:{
                id : id
            }
        }   
        )
    }
}

export default new article