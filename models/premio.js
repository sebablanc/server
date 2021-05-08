'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class premio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  premio.init({
    id:{ 
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    fechaSorteo: {
      type: DataTypes.DATEONLY,
      field: 'fechasorteo',
      allowNull: false,
      defaultValue: sequelize.literal("(now() at time zone 'utc+3')")
    },
    numeroCupon: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'numerocupon'
    },
    alumnoFavorecido: { 
      type: DataTypes.STRING,
      allowNull: false,
      field: 'alumnofavorecido'
    },
    alumnoExtractor: { 
      type: DataTypes.STRING,
      allowNull: false,
      field: 'alumnoextractor'
    },
    detalleExtraccion: { 
      type: DataTypes.STRING,
      allowNull: false,
      field: 'detalleextraccion'
    },
    mes: { 
      type: DataTypes.STRING,
      allowNull: false,
      field: 'mes'
    },
    tipo: { 
      type: DataTypes.STRING,
      allowNull: false,
      field: 'tipo'
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
    modelName: 'premio',
    tableName: 'premio'
  });
  return premio;
};