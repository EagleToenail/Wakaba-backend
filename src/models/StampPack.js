module.exports = (sequelize, DataTypes) => {
    const StampPack = sequelize.define('StampPack', {
      id: {
        type:             DataTypes.INTEGER,
        allowNull:        false,
        primaryKey:       true,
        autoIncrement:    true
      },
      type: {
        type: DataTypes.STRING(20),
      },
      stampValue: {
        type: DataTypes.STRING(20),
        defaultValue:'0',
      },
      numberOfSheets: {
        type: DataTypes.STRING(20),
        defaultValue:'0',
      },
      totalFaceValue: {
        type: DataTypes.STRING(20),
        defaultValue:'0',
      },
      purchasePrice: {
        type: DataTypes.STRING(20),
        defaultValue:'0',
      },
      packstage: {
        type: DataTypes.ENUM,
        values: ['査定中', 'お預かり','買取済','発送中','約定済','オークション出品済','オークション発送済','廃棄','基準外','返品・返金'],
        defaultValue: '査定中'
      },
    })
    return StampPack
  }