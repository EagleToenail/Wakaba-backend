module.exports = (sequelize, DataTypes) => {
    const PreciousMetalsPrice = sequelize.define('PreciousMetalsPrice', {
      id: {
        type:             DataTypes.INTEGER,
        allowNull:        false,
        primaryKey:       true,
        autoIncrement:    true
      },
      K24特定品:          DataTypes.STRING,
      K24:                DataTypes.STRING,
      K22:                DataTypes.STRING,
      K20:                DataTypes.STRING,
      K18:                DataTypes.STRING,
      K15:                DataTypes.STRING,
      K14:                DataTypes.STRING,
      K12:                DataTypes.FLOAT,
      K10:                DataTypes.FLOAT,
      K9:                 DataTypes.STRING,
      Pt特定品:           DataTypes.STRING,
      Pt1000	:         DataTypes.STRING,
      Pt950	:             DataTypes.STRING,
      Pt900:              DataTypes.STRING,
      Pt850:              DataTypes.STRING,
      Pt800:              DataTypes.STRING,
      Pt750:              DataTypes.STRING,
      SV:                 DataTypes.STRING,
  
    })
    return PreciousMetalsPrice
  }