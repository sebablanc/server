'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class persona extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      persona.belongsTo(models.localidad,{
        as: 'localidad',
        foreignKey: 'localidadId'
      });
      persona.hasMany(models.user, {as: 'usuarios'});

      persona.hasMany(models.personaCurso, {as: 'observaciones'});
    }
  };
  persona.init({
    id:{ 
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nroCuenta: { 
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      field: 'nrocuenta'
    },
    nombre: { 
      type: DataTypes.STRING,
      allowNull: false
    },
    apellido: { 
      type: DataTypes.STRING,
      allowNull: false
    },
    direccion: DataTypes.STRING,
    telefono: { 
      type: DataTypes.STRING,
      allowNull: false
    },
    celular: DataTypes.STRING,
    email: DataTypes.STRING,
    otroMedio:{
      type: DataTypes.STRING,
      field: 'otromedio'
    },
    localidadId: {
      type: DataTypes.INTEGER,
      field: 'localidadid'
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
    createdAt: {
      type: DataTypes.DATE,
      field: 'createdat'
    },
    foto: DataTypes.STRING,
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updatedat'
    }
  }, {
    sequelize,
    modelName: 'persona',
    tableName: 'persona'
  });
  return persona;
};