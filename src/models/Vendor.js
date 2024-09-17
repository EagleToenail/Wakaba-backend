module.exports = (sequelize, DataTypes) => {
  const Vendor = sequelize.define('Vendor', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },

    vendor_name: DataTypes.STRING,
    
    貴金属: {
      type: DataTypes.ENUM,
      values: ['y', 'n'],
      defaultValue: 'n',
    },
    古銭等: {
      type: DataTypes.ENUM,
      values: ['y', 'n'],
      defaultValue: 'n',
    },
    バッグ: {
      type: DataTypes.ENUM,
      values: ['y', 'n'],
      defaultValue: 'n',
    },
    時計: {
      type: DataTypes.ENUM,
      values: ['y', 'n'],
      defaultValue: 'n',
    },
    財布: {
      type: DataTypes.ENUM,
      values: ['y', 'n'],
      defaultValue: 'n',
    },
    アクセサリ: {
      type: DataTypes.ENUM,
      values: ['y', 'n'],
      defaultValue: 'n',
    },
    骨董品: {
      type: DataTypes.ENUM,
      values: ['y', 'n'],
      defaultValue: 'n',
    },
    洋酒: {
      type: DataTypes.ENUM,
      values: ['y', 'n'],
      defaultValue: 'n',
    },
    カメラ: {
      type: DataTypes.ENUM,
      values: ['y', 'n'],
      defaultValue: 'n',
    },
    楽器: {
      type: DataTypes.ENUM,
      values: ['y', 'n'],
      defaultValue: 'n',
    },
    着物: {
      type: DataTypes.ENUM,
      values: ['y', 'n'],
      defaultValue: 'n',
    },
    スマホ夕ブレット: {
      type: DataTypes.ENUM,
      values: ['y', 'n'],
      defaultValue: 'n',
    },
    その他: {
      type: DataTypes.ENUM,
      values: ['y', 'n'],
      defaultValue: 'n',
    },
    // precious_metal:       {
    //     type: DataTypes.ENUM,
    //     values: ['y', 'n'],
    //     defaultValue: 'n',
    //   },              
    // old_coin:             {
    //     type: DataTypes.ENUM,
    //     values: ['y', 'n'],
    //     defaultValue: 'n',
    //   },              
    // bag:                  {
    //     type: DataTypes.ENUM,
    //     values: ['y', 'n'],
    //     defaultValue: 'n',
    //   },              
    // clock:                {
    //     type: DataTypes.ENUM,
    //     values: ['y', 'n'],
    //     defaultValue: 'n',
    //   },              
    // wallet:               {
    //     type: DataTypes.ENUM,
    //     values: ['y', 'n'],
    //     defaultValue: 'n',
    //   },              
    // assessories:          {
    //     type: DataTypes.ENUM,
    //     values: ['y', 'n'],
    //     defaultValue: 'n',
    //   },              
    // antique:              {
    //     type: DataTypes.ENUM,
    //     values: ['y', 'n'],
    //     defaultValue: 'n',
    //   },              
    // western_liquor:       {
    //     type: DataTypes.ENUM,
    //     values: ['y', 'n'],
    //     defaultValue: 'n',
    //   },              
    // camera:               {
    //     type: DataTypes.ENUM,
    //     values: ['y', 'n'],
    //     defaultValue: 'n',
    //   },              
    // musical_instrument:   {
    //     type: DataTypes.ENUM,
    //     values: ['y', 'n'],
    //     defaultValue: 'n',
    //   },              
    // kimono:               {
    //     type: DataTypes.ENUM,
    //     values: ['y', 'n'],
    //     defaultValue: 'n',
    //   },              
    // smart_phone_tablet:   {
    //     type: DataTypes.ENUM,
    //     values: ['y', 'n'],
    //     defaultValue: 'n',
    //   },              
  },
    {
      timestamps: false,    // Optional: disable timestamps if you don't have createdAt/updatedAt fields
    })

  return Vendor
}