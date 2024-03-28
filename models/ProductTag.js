const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');
const Tag = require('./Tag');

class ProductTag extends Model {}

ProductTag.init(
  {
    
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    tag_name:{
      type: DataTypes.INTEGER,
      references: {
        model: Tag,
        key: 'id',
      },
    }

  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;
