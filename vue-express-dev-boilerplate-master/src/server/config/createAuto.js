let fs = require('fs')

let files = fs.readdirSync('../model')
let models = []
// 解析名称做成驼峰命名法
files.forEach(item => {
    if (item != 'index.js') {
        let names = item.split('.')[0].split('_')
        let name = ''
        for (let i = 1; i < names.length; i++) {
            name += names[0]
        }
        console.log(names.length)
        models.push({name: names[0], path: './' + item})
    }
})
// 文件内容模板
const template = `
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
const models =${JSON.stringify(models, null, 4)}
// 数据模型输出
models.forEach(item => {
    module.exports[item.name] = require(item.path)(sequelize, Sequelize)
})
`
fs.writeFile("../model/index.js", template, function () {
    console.log('创建成功')
})