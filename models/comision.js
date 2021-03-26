'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comision extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      comision.belongsTo(models.curso, {
        as: 'curso',
        foreignKey: 'cursoId'
      });

      comision.hasMany(models.personaComision, {as: 'alumnos'});
    }
  };
  comision.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    cursoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'cursoid'
    },
    dias: DataTypes.STRING,
    horaDesde: {
      type: DataTypes.DATE,
      field: 'horadesde',
      defaultValue: sequelize.literal("(now() at time zone 'utc+3')")
    },
    horaHasta: {
      type: DataTypes.DATE,
      field: 'horahasta',
      defaultValue: sequelize.literal("(now() at time zone 'utc+3')")
    },
    fechaInicio: {
      type: DataTypes.DATEONLY,
      field: 'fechainicio'
    },
    fechaFin: {
      type: DataTypes.DATEONLY,
      field: 'fechafin'
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
    modelName: 'comision',
    tableName: 'comision'
  });
  return comision;
};