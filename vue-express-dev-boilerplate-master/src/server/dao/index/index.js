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
    searchListType(){
        return productType.findAll({
            raw:true,
            where:{
                isDel:0
            }
        })
    }
    apiSearchListType(){
        let include = [{
            association: productType.hasOne(products, {foreignKey:'id'}),
            raw:true,
            isDel:0
        }]  
        return productType.findAll({inclde:include})
    }
    searchProdctsList(){
        return products.findAll({
            raw:true,
            where:{
                isDel:0
            }
        })
    }
    searchApiProdctsList(typeId){
        return products.findAll({
            raw:true,
            where:{
                isDel:0,
                typeId:typeId
            }
        })
    }
    searchcategoryList(){
        return productCategory.findAll({
            raw:true,
            where:{
                isDel:0
            }
        })
    }
    searchDetailList(){
        return productDetail.findAll({
            raw:true,
            where:{
                isDel:0
            }
        })
    }
    searchDetailListCount(pageSize,currentPage){
        let offset = (currentPage - 1) * pageSize
        return productDetail.findAndCountAll({
            offset: offset,
            limit: pageSize,
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
                id : id,
                isDel:0
            }
        }
        )
    }
    deleteDetailList(id){
        return productDetail.update({
            isDel :1
        },{
            where:{
                id : id,
                isDel:0
            }
        }   
        )
    }
    deleteSearchDetail(categoryId){
        return productDetail.findAll({
            where:{
                categoryId:categoryId,
                isDel:0
            }
        })
    }
    deleteUpdateCategory(id){
        return productCategory.update(
            {isDel:1},
            {
            where:{
                id:id,
                isDel:0
            }
        })
    }
    deleteSearchCategory(productsId){
        return productCategory.findAll({
            where:{
                productsId:productsId,
                isDel:0
            }
        })
    }
    deleteUpdateproducts(id){
        return products.update(
            {isDel:1},
            {
            where:{
                id:id,
                isDel:0
            }
        })
    }
    deleteSearchCategory(productsId){
        return productCategory.findAll({
            where:{
                productsId:productsId,
                isDel:0
            }
        })
    }
    deleteUpdateproducts(id){
        return products.update(
            {isDel:1},
            {
            where:{
                id:id,
                isDel:0
            }
        })
    }
    deleteSearchProducts(typeId){
        return products.findAll({
            where:{
                typeId:typeId,
                isDel:0
            }
        })
    }
    deleteUpdateProductsType(id){
        return productType.update(
            {isDel:1},
            {
            where:{
                id:id,
                isDel:0
            }
        })
    }
}

export default new article