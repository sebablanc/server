'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class curso extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      curso.hasMany(models.comision, {as: 'comisiones'});
      curso.hasMany(models.personaCurso, {as: 'observaciones'});
    }
  };
  curso.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: { 
      type:DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    imagen: DataTypes.STRING,
    programa: DataTypes.STRING,
    valor: {
      type: DataTypes.FLOAT,
      allowNull: false
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
    modelName: 'curso',
    tableName: 'curso'
  });
  return curso;
};