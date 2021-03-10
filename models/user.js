'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.belongsTo(models.persona,{
        as: 'persona',
        foreignKey: 'personaId'
      });
    }
  };
  user.init({
    id:{ 
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    email: { 
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    pass:{ 
      type: DataTypes.STRING,
      allowNull: false
    },
    activated: DataTypes.BOOLEAN,
    personaId: {
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
    modelName: 'user',
    tableName: 'userdr'
  });
  return user;
};