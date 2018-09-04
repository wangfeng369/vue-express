/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('article', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: '1',
			primaryKey: true
		},
		articleName: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		acticleText: {
			type: DataTypes.TEXT,
			allowNull: false
		}
	}, {
		tableName: 'article',
		timestamps: false
	});
};
