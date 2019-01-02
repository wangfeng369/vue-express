/* jshint indent: 1 */
const moment = require('moment')

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('user', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		password: {
			type: DataTypes.STRING(255),
			allowNull: false,
			defaultValue: ''
		},
		userName: {
			field:"user_name",
			type: DataTypes.STRING(255),
			allowNull: true,
			defaultValue: ''
		},
		bgImage: {
			field:"bg_image",
			type: DataTypes.STRING(255),
			allowNull: true,
			defaultValue: ''
		},
		logo: {
			type: DataTypes.STRING(255),
			allowNull: true,
			defaultValue: ''
		},
		title: {
			type: DataTypes.STRING(255),
			allowNull: true,
			defaultValue: ''
		},
		createTime:{
			field:"create_time",
			type: DataTypes.DATE(),
			allowNull: true,
			get(){
				return moment(this.getDataValue('createTime')).format('YYYY-MM-DD HH:mm')
			}
			
		},
		isLive:{
			field:"is_live",
			type: DataTypes.STRING(255),
			allowNull: true,
			defaultValue: 0
		},
		code:{
			type: DataTypes.STRING(255),
			allowNull: true,
			defaultValue: 0
		},
		email:{
			type: DataTypes.STRING(255),
			allowNull: true,
			defaultValue: ''
		},
		openId:{
			field:"open_id",
			type: DataTypes.STRING(255),
			allowNull: true,
			defaultValue: 0
		},
		
	}, {
		tableName: 'user',
		timestamps: false,
		underscored: true
	});
};
