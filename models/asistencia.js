'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class asistencia extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      asistencia.belongsTo(models.personaComision, {
        as: 'comision',
        foreignKey: 'personaComisionId'
      });
    }
  };
  asistencia.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    personaComisionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'personacomisionid'
    },
    fechaClase:{
      type: DataTypes.DATEONLY,
      field: 'fechaclase',
      defaultValue: sequelize.literal("(now() at time zone 'utc+3')")
    },
    asiste: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
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
    modelName: 'asistencia',
    tableName: 'asistencia'
  });
  return asistencia;
};