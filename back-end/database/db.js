const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'tarefas.sqlite',
  logging: false
});

module.exports = sequelize;
