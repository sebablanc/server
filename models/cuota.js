'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cuota extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      cuota.belongsTo(models.alumnoComision, {
        as: 'inscripcion',
        foreignKey: 'alumnoComisionId'
      });
    }
  };
  cuota.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    alumnoComisionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'alumnocomisionid'
    },
    pagado:{
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    nroCuota: {
      type: DataTypes.INTEGER,
      field: 'nrocuota'
    },
    fechaVenc: {
      type: DataTypes.DATEONLY,
      field: 'fechavenc'
    },
    fechaPago:  {
      type: DataTypes.DATEONLY,
      field: 'fechapago',
      defaultValue: sequelize.literal("(now() at time zone 'utc+3')")
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
    modelName: 'cuota',
    tableName: 'cuota'
  });
  return cuota;
};