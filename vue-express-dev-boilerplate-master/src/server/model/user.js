import Sequelize from 'sequelize'
import sequelize from '../config/db'

let User = sequelize.define('userInfo',{
    id:{
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defautValue: Sequelize.UUID1,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        state:{
            type: Sequelize.STRING,
            defautValue: '0'
        }
    }
},
    {
        freezeTableName :true,
        tableName: 'userInfo',
        timestamps: false,
        indexex:[{
            type: 'UNIQUE',
            method: 'BTREE',
            unique: true,
            fields: ['uuid'],
        }],
        comment: 'user Info'
    }
) 

module.exports = User;