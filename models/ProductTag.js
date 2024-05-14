// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');
// Import Tag model for use in ProductTag models
const Tag = require('./Tag');
// Import Product model for use in ProductTag models
const Product = require('./Product');
// Initialize ProductTag model (table) by extending off Sequelize's Model class
class ProductTag extends Model {}

// set up fields and rules for ProductTag model
ProductTag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    product_id:{
      type: DataTypes.INTEGER,
      references: {
        model: Product,
        key: 'id',
      },
    },
    tag_id:{
      type: DataTypes.INTEGER,
      references: {
        model: Tag,
        key: 'id',
      },
    },

  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

//export
module.exports = ProductTag;
