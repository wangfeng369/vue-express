/* jshint indent: 1 */

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
			allowNull: true,
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
	}, {
		tableName: 'user',
		timestamps: false,
		underscored: true
	});
};
