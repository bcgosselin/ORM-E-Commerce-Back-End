// requirments 
require('dotenv').config();

const Sequelize = require('sequelize');

// connect to mysql
const sequelize =  new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USER, 
  process.env.DB_PW, 
    {
      host: 'localhost',
      dialect: 'mysql',
      dialectOptions: {
        decimalNumbers: true,
      },
    }
);

// export
module.exports = sequelize;