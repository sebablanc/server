'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class alumnoComision extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      alumnoComision.belongsTo(models.alumno, {
        as: 'alumno', 
        foreignKey: 'alumnoId'
      });
      
      alumnoComision.belongsTo(models.comision, {
        as: 'comision',
        foreignKey: 'comisionId'
      });

      alumnoComision.hasMany(models.cuota,{as: 'cuotas'});

      alumnoComision.hasMany(models.inscripcionDescuento, {as: 'descuentos'});
      
      alumnoComision.hasMany(models.asistencia, {as: 'asistencias'});
    }
  };
  alumnoComision.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    fechaInscripcion:{
      type: DataTypes.DATEONLY,
      field: 'fechainscripcion',
      defaultValue: sequelize.literal("(now() at time zone 'utc+3')")
    },
    alumnoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'alumnoid'
    },
    comisionId:  {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'comisionid'
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
    modelName: 'alumnoComision',
    tableName: 'alumnocomision'
  });
  return alumnoComision;
};