/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('text1', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		username: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		content: {
			type: DataTypes.TEXT,
			allowNull: true
		}
	}, {
		tableName: 'text1',
		timestamps: false
	});
};
