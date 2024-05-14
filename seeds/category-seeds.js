// import
const { Category } = require('../models');

// establish category seeds
const categoryData = [
  {
    category_name: 'Shirts',
  },
  {
    category_name: 'Shorts',
  },
  {
    category_name: 'Music',
  },
  {
    category_name: 'Hats',
  },
  {
    category_name: 'Shoes',
  },
];

// bulk create
const seedCategories = () => Category.bulkCreate(categoryData);

// export
module.exports = seedCategories;
