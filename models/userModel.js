const { DataTypes } = require('sequelize');

const sequelize = require('../config/db');

const Expense = sequelize.define('Userexpenses',
{
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  description: DataTypes.STRING,
  amount:{
    type: DataTypes.STRING,
    allowNull: false
  },
  category:{
    type: DataTypes.STRING,
    allowNull: false
  }
},
  {
    tableName: 'Userexpenses' // Specify the actual table name here
}
);

module.exports = Expense;