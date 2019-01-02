import Sequelize from 'sequelize'

const sequelize = new Sequelize('food','root','wangfeng123',{
    host: "120.79.213.80",
    dialect: 'mysql',
    port:'3306',
    pool:{
        max:10,
        min:0,
        idle:1000
    },
    define:{
        charset: 'utf8',
        underscored:true
    },
    timezone:'+08:00'
})

module.exports = sequelize;