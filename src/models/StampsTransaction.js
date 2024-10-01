module.exports = (sequelize, DataTypes) => {
    const StampsTransaction = sequelize.define('StampsTransaction', {
      id: {
        type:             DataTypes.INTEGER,
        allowNull:        false,
        primaryKey:       true,
        autoIncrement:    true
      },
      date: {
        type: DataTypes.STRING(20),
        defaultValue:'0',
      },
      in_charge: {
        type: DataTypes.STRING(20),
        defaultValue:'0',
      },
      inorout: {
        type: DataTypes.STRING(20),
        defaultValue:'0',
      },
      stamp_type: {
        type: DataTypes.STRING(20),
        defaultValue:'0',
      },
      stamp_ids: {
        type: DataTypes.STRING(20),
        defaultValue:'0',
      },
      stamp_numbers: {
        type: DataTypes.STRING(20),
        defaultValue:'0',
      },
      stamp_status: {
        type: DataTypes.ENUM,
        values: ['適用中', '承認された'],
        defaultValue: '適用中'
      },
      totalFaceValue: {
        type: DataTypes.STRING(20),
        defaultValue:'0',
      },
      five_up_facevalue: {
        type: DataTypes.STRING(20),
        defaultValue:'0',
      },
      five_down_facevalue: {
        type: DataTypes.STRING(20),
        defaultValue:'0',
      },
      five_up_facevalue: {
        type: DataTypes.STRING(20),
        defaultValue:'0',
      },
      reason: {
        type: DataTypes.TEXT,
        defaultValue:'0',
      },
      pack1:{
        type: DataTypes.STRING(20),
        defaultValue:'0',
      },
      pack11:{
        type: DataTypes.STRING(20),
        defaultValue:'0',
      },
      pack2:{
        type: DataTypes.STRING(20),
        defaultValue:'0',
      },
      pack22:{
        type: DataTypes.STRING(20),
        defaultValue:'0',
      },
      stamp1:{
        type: DataTypes.STRING(20),
        defaultValue:'0',
      },
      stamp2:{
        type: DataTypes.STRING(20),
        defaultValue:'0',
      },
      stamp3:{
        type: DataTypes.STRING(20),
        defaultValue:'0',
      },
      stamp4:{
        type: DataTypes.STRING(20),
        defaultValue:'0',
      },
      stamp5:{
        type: DataTypes.STRING(20),
        defaultValue:'0',
      },
      stamp6:{
        type: DataTypes.STRING(20),
        defaultValue:'0',
      },
      stamp7:{
        type: DataTypes.STRING(20),
        defaultValue:'0',
      },
    })
    return StampsTransaction
  }