'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('cuota', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      comisionId: {
        type: Sequelize.INTEGER
      },
      pagado: {
        type: Sequelize.BOOLEAN
      },
      nroCuota: {
        type: Sequelize.INTEGER
      },
      fechaVenc: {
        type: Sequelize.DATEONLY
      },
      fechaPago: {
        type: Sequelize.DATEONLY
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
    await queryInterface.dropTable('cuota');
  }
};