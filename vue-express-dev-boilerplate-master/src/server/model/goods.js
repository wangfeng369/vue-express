/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('goods', {
		id: {
			type: DataTypes.CHAR(36),
			allowNull: false,
			primaryKey: true
		},
		email: {
			type: DataTypes.STRING(255),
			allowNull: false,
			unique: true
		},
		password: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		userInfoId: {
			type: DataTypes.CHAR(36),
			allowNull: true,
			references: {
				model: 'userinfo',
				key: 'id'
			}
		}
	}, {
		tableName: 'goods',
		timestamps: false
	});
};
