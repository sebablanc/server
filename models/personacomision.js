'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class personaComision extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      personaComision.belongsTo(models.persona, {
        as: 'persona', 
        foreignKey: 'personaId'
      });
      
      personaComision.belongsTo(models.comision, {
        as: 'comision',
        foreignKey: 'comisionId'
      });

      personaComision.hasMany(models.cuota,{as: 'cuotas'});

      personaComision.hasMany(models.inscripcionDescuento, {as: 'descuentos'});
      
      personaComision.hasMany(models.asistencia, {as: 'asistencias'});
    }
  };
  personaComision.init({
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
    personaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'personaid'
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
    modelName: 'personaComision',
    tableName: 'personacomision'
  });
  return personaComision;
};