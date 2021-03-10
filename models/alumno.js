'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class alumno extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      alumno.belongsTo(models.persona,{
        as: 'persona',
        foreignKey: 'personaId'
      });

      alumno.hasMany(models.alumnoComision, {as: 'comisiones'});
    }
  };
  alumno.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    dni: { 
      type:DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    fechaNacimiento: { 
      type:DataTypes.DATE,
      field: 'fechanacimiento'
    },
    foto: DataTypes.STRING,
    personaId:{
      type: DataTypes.INTEGER,
      field: 'personaid'
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
    modelName: 'alumno',
    tableName: 'alumno'
  });
  return alumno;
};