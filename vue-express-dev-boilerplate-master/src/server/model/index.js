
var  Sequelize = require('sequelize');
// 创建数据库连接
var sequelize = new Sequelize('demo', 'root', '123', {
    host: 'localhost',
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
        "name": "demo",
        "path": "./demo_tbl.js"
    },
    {
        "name": "Readme",
        "path": "./Readme.md"
    },
    {
        "name": "text",
        "path": "./text.js"
    },
    {
        "name": "text1",
        "path": "./text1.js"
    },
    {
        "name": "user",
        "path": "./user.js"
    },
    {
        "name": "userinfo",
        "path": "./userinfo.js"
    }
]
// 数据模型输出
models.forEach(item => {
    module.exports[item.name] = require(item.path)(sequelize, Sequelize)
})
