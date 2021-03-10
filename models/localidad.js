'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class localidad extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      localidad.hasMany(models.persona, {as: 'personas'})
    }
  };
  localidad.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    codPostal: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'codpostal'
    },
    ciudad:{ 
      type:DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    provincia: DataTypes.STRING,
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
    modelName: 'localidad',
    tableName: 'localidad'
  });
  return localidad;
};