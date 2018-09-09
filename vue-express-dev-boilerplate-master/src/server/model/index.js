
var  Sequelize = require('sequelize');
// 创建数据库连接
var sequelize = new Sequelize('demo', 'root', '123', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    define:{
        charset: 'utf8',
        underscored:true
    }
})
// 数据库模型名称及lujing
const models =[
    {
        "name": "class",
        "path": "./class.js"
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
