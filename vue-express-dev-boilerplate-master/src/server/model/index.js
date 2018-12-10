
var  Sequelize = require('sequelize');
// 创建数据库连接
var sequelize = new Sequelize('food', 'root', 'wangfeng123', {
    host: '120.79.213.80',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
})
// 数据库模型名称及lujing
const models =[
    {
        "name": "article",
        "path": "./article.js"
    },
    {
        "name": "class",
        "path": "./class.js"
    },
    {
        "name": "products",
        "path": "./products.js"
    },
    {
        "name": "productCategory",
        "path": "./product_category.js"
    },
    {
        "name": "productDetail",
        "path": "./product_detail.js"
    },
    {
        "name": "productType",
        "path": "./product_type.js"
    },
    {
        "name": "student",
        "path": "./student.js"
    },
    {
        "name": "teacher",
        "path": "./teacher.js"
    },
    {
        "name": "user",
        "path": "./user.js"
    }
]
// 数据模型输出
models.forEach(item => {
    module.exports[item.name] = require(item.path)(sequelize, Sequelize)
})
