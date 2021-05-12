'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cursoArchivo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      cursoArchivo.belongsTo(models.curso, {as: 'curso'});
    }
  };
  cursoArchivo.init({
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
    nombreArchivo:{ 
      type:DataTypes.STRING,
      allowNull: false,
      field: 'nombrearchivo'
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
    modelName: 'cursoArchivo',
    tableName: 'cursoarchivo'
  });
  return cursoArchivo;
};