/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('userinfo', {
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
		}
	}, {
		tableName: 'userinfo',
		timestamps: false
	});
};
