/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('demo_tbl', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataTypes.STRING(100),
			allowNull: false
		},
		sex: {
			type: DataTypes.STRING(40),
			allowNull: false
		},
		date: {
			type: DataTypes.DATEONLY,
			allowNull: true
		}
	}, {
		tableName: 'demo_tbl',
		timestamps: false
	});
};
