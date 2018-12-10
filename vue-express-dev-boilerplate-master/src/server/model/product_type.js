/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('product_type', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataTypes.STRING(255),
			allowNull: false,
			defaultValue: ''
		},
		isDel: {
			field:"is_del",
			type: DataTypes.STRING(255),
			allowNull: false,
			defaultValue: '0'
		}
	}, {
		tableName: 'product_type',
		timestamps: false,
		underscored: true
	});
};
