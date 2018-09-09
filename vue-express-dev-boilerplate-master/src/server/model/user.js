/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('user', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		user_name: {
			type: DataTypes.STRING(255),
			allowNull: false,
			defaultValue: ''
		},
		password: {
			type: DataTypes.STRING(255),
			allowNull: false,
			defaultValue: ''
		}
	}, {
		tableName: 'user',
		timestamps: false,
		underscored: true
	});
};
