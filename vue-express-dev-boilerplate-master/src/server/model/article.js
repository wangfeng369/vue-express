/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('article', {
		id: {
			type: DataTypes.BIGINT,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		title: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		content: {
			type: DataTypes.TEXT,
			allowNull: false
		}
	}, {
		tableName: 'article',
		timestamps: false
	});
};
