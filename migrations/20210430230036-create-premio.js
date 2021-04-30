'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('premios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fechaSorteo: {
        type: Sequelize.DATE
      },
      numeroCupon: {
        type: Sequelize.INTEGER
      },
      alumnoFavorecido: {
        type: Sequelize.STRING
      },
      alumnoExtractor: {
        type: Sequelize.STRING
      },
      detalleExtraccion: {
        type: Sequelize.STRING
      },
      tipo: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('premios');
  }
};