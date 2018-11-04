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
      defaultValue:''
    },
    content:{
      type:DataTypes.TEXT                        
    },
    author:{
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue:''
    },
    avatar:{
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue:''
    },
    articleHerf:{
      field:'article_href',
      type: DataTypes.STRING(255),
      allowNull:false,
      defaultValue:''
    },
    comments:{
      type: DataTypes.STRING(255),
      allowNull:false,
      defaultValue:'0'
    }, 
    like:{
      type: DataTypes.STRING(255),
      allowNull:false,
      defaultValue:'0'
    },
    isDel:{
      field:'is_del',
      type: DataTypes.STRING(255),
      allowNull:false,
      defaultValue:'0'
    },
    isLike:{
      field:'is_like',
      type:DataTypes.STRING,
      allowNull:true,
      defaultValue:'0'
    }
	}, {
		tableName: 'article',
		timestamps: true,
		underscored: true
	});
};
