import Sequelize from 'sequelize'

const sequelize = new Sequelize('demo','root','',{
    host: "localhost",
    dialect: 'mysql',
    port:'3306',
    pool:{
        max:10,
        min:0,
        idle:1000
    },
    
})

module.exports = sequelize;