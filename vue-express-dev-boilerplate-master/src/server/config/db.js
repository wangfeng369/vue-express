import Sequelize from 'sequelize'

const sequelize = new Sequelize('demo','root','123',{
    host: "localhost",
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
    }
})

module.exports = sequelize;