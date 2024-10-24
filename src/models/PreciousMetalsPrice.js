module.exports = (sequelize, DataTypes) => {
    const PreciousMetalsPrice = sequelize.define('PreciousMetalsPrice', {
      id: {
        type:             DataTypes.INTEGER,
        allowNull:        false,
        primaryKey:       true,
        autoIncrement:    true
      },
      date:           DataTypes.STRING(50),
      K24特定品:          DataTypes.STRING(50),
      K24:                DataTypes.STRING(50),
      K22:                DataTypes.STRING(50),
      K20:                DataTypes.STRING(50),
      K18:                DataTypes.STRING(50),
      K15:                DataTypes.STRING(50),
      K14:                DataTypes.STRING(50),
      K12:                DataTypes.STRING(50),
      K10:                DataTypes.STRING(50),
      K9:                 DataTypes.STRING(50),
      Pt特定品:           DataTypes.STRING(50),
      Pt1000	:         DataTypes.STRING(50),
      Pt950	:             DataTypes.STRING(50),
      Pt900:              DataTypes.STRING(50),
      Pt850:              DataTypes.STRING(50),
      Pt800:              DataTypes.STRING(50),
      Pt750:              DataTypes.STRING(50),
      SV:                 DataTypes.STRING(50),
  
    })
    return PreciousMetalsPrice
  }