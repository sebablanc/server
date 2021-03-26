'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class inscripcionDescuento extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      inscripcionDescuento.belongsTo(models.personaComision, {
        as: 'inscripcion',
        foreignKey: 'personaComisionId'
      });
      
      inscripcionDescuento.belongsTo(models.descuento, {
        as: 'descuentos',
        foreignKey: 'descuentoId'
      });
    }
  };
  inscripcionDescuento.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    personaComisionId:  {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'personacomisionid'
    },
    descuentoId:{
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'descuentoid'
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'createdat'
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updatedat'
    }
  }, {
    sequelize,
    modelName: 'inscripcionDescuento',
    tableName: 'inscripciondescuento'
  });
  return inscripcionDescuento;
};