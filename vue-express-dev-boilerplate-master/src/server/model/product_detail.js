/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('product_detail', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		categoryId: {
			field:"category_id",
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true
		},
		name: {
			type: DataTypes.STRING(255),
			allowNull: false,
			defaultValue: ''
		},
		englishName: {
			field:"english_name",
			type: DataTypes.STRING(255),
			allowNull: true,
			defaultValue: ''
		},
		code: {
			type: DataTypes.STRING(255),
			allowNull: true,
			defaultValue: ''
		},
		size: {
			type: DataTypes.STRING(255),
			allowNull: true,
			defaultValue: ''
		},
		deadline: {
			type: DataTypes.STRING(255),
			allowNull: true,
			defaultValue: ''
		},
		place: {
			type: DataTypes.STRING(255),
			allowNull: true,
			defaultValue: ''
		},
		pic: {
			type: DataTypes.STRING(255),
			allowNull: true,
			defaultValue: ''
		},
		isDel: {
			field:"is_del",
			type: DataTypes.STRING(255),
			allowNull: false,
			defaultValue: '0'
		},
		detail: {
			type: DataTypes.STRING(1000),
			allowNull: true,
			defaultValue: ''
		},
		price: {
			type: DataTypes.STRING(255),
			allowNull: true,
			defaultValue: ''
		},
	}, {
		tableName: 'product_detail',
		timestamps: false,
		underscored: true
	});
};
