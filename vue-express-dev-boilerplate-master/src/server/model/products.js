/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('products', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		typeId: {
			field:"type_id",
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		productName: {
			field:"product_name",
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
		tableName: 'products',
		timestamps: false,
		underscored: true
	});
};
