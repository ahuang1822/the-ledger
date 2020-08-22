'use strict';
module.exports = (sequelize, DataTypes) => {
  const Expense = sequelize.define(
    'Expense',
    {
      date: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      total: {
        type: DataTypes.NUMBER,
        allowNull: false,
      },
    },
    {}
  );
  Expense.associate = (models) => {
    Expense.belongsTo(models.User, {
      foreignKey: userId,
      onDelete: 'CASCADE',
    });
  };
  return Expense;
};
