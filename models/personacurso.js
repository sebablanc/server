'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class personaCurso extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      personaCurso.belongsTo(models.curso, {as: 'curso', foreignKey: 'cursoId'});
      
      personaCurso.belongsTo(models.persona, {as: 'persona', foreignKey: 'personaId'});
    }
  };
  personaCurso.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    fechaCons: {
      type: DataTypes.DATEONLY,
      field: 'fechacons',
      defaultValue: sequelize.literal("(now() at time zone 'utc+3')")
    },
    cursoId:{
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'cursoid'
    },
    personaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'personaid'
    },
    observacion: DataTypes.STRING,
    color: DataTypes.STRING,
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
    modelName: 'personaCurso',
    tableName: 'personacurso'
  });
  return personaCurso;
};