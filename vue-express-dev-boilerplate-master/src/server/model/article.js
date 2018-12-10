/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('article', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		title: {
			type: DataTypes.STRING(255),
			allowNull: false,
			defaultValue: ''
		},
		content: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		author: {
			type: DataTypes.STRING(255),
			allowNull: false,
			defaultValue: ''
		},
		avatar: {
			type: DataTypes.STRING(255),
			allowNull: true,
			defaultValue: ''
		},
		article_href: {
			type: DataTypes.STRING(255),
			allowNull: false,
			defaultValue: ''
		},
		comments: {
			type: DataTypes.STRING(255),
			allowNull: false,
			defaultValue: '0'
		},
		like: {
			type: DataTypes.STRING(255),
			allowNull: false,
			defaultValue: '0'
		},
		is_del: {
			type: DataTypes.STRING(255),
			allowNull: false,
			defaultValue: '0'
		},
		is_like: {
			type: DataTypes.STRING(255),
			allowNull: true,
			defaultValue: '0'
		},
		created_at: {
			type: DataTypes.DATE,
			allowNull: false
		},
		updated_at: {
			type: DataTypes.DATE,
			allowNull: false
		}
	}, {
		tableName: 'article',
		timestamps: false,
		underscored: true
	});
};
