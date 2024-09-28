module.exports = (sequelize, DataTypes) => {
    const StampSheet = sequelize.define('StampSheet', {
      id: {
        type:             DataTypes.INTEGER,
        allowNull:        false,
        primaryKey:       true,
        autoIncrement:    true
      },
      stampValue: {
        type: DataTypes.STRING(20),
        allowNull: true
      },
      numberOfSides: {
        type: DataTypes.STRING(20),
        allowNull: true
      },
      sheetValue: {
        type: DataTypes.STRING(20),
        allowNull: true
      },
      numberOfSheets: {
        type: DataTypes.STRING(20),
        allowNull: true
      },
      totalFaceValue: {
        type: DataTypes.STRING(20),
        allowNull: true
      },
      purchasePrice: {
        type: DataTypes.STRING(20),
        allowNull: true
      },
      sheetstag: {
        type: DataTypes.ENUM,
        values: ['査定中', 'お預かり','買取済','発送中','約定済','オークション出品済','オークション発送済','廃棄','基準外','返品・返金'],
        defaultValue: '査定中'
      },
    })
    return StampSheet
  }