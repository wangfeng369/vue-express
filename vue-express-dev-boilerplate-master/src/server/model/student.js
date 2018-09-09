/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('student', {
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
		sex: {
			type: DataTypes.STRING(36),
			allowNull: false
		},
		classId: {
			field:'class_id',
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		isDelete: {
			field:'is_delete',
			type: DataTypes.STRING(36),
			allowNull: false,
			defaultValue: '0'
		}
	}, {
		tableName: 'student',
		timestamps: false,
		underscored: true
	});
};
