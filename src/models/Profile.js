
module.exports = (sequelize, DataTypes) => {
    const Profile = sequelize.define('Profile', {
      id: {
        type:             DataTypes.INTEGER,
        allowNull:        false,
        primaryKey:       true,
        autoIncrement:    true
      },
      user_id: {
        type: DataTypes.STRING,
        required: true,
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
        trim: true,
        required: true,
        minLength: 3,
        maxLength: 24,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        required: true,
      },
      fullname: {
        type: DataTypes.STRING,
        trim: true,
        required: true,
        minLength: 3,
        maxLength: 32,
      },
      avatar: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      bio: {
        type: DataTypes.STRING,
        trim: true,
        defaultValue: '',
      },
      phone: {
        type: DataTypes.STRING,
        trim: true,
        defaultValue: '',
      },
      dialCode: {
        type: DataTypes.STRING,
        trim: true,
        defaultValue: '',
      },
      //=========
      store_name:          DataTypes.STRING,
      store_type:          DataTypes.STRING,
      katakana_name:       DataTypes.STRING,
      // email: {
      //   type:              DataTypes.STRING,
      //   unique:             true
      // },
      birtday:             DataTypes.STRING, 
      idcard_image:        DataTypes.STRING,
      card_type:           DataTypes.STRING,
      prefectures:         DataTypes.STRING,
      city:                DataTypes.STRING,
      address:             DataTypes.TEXT,
      resume:              DataTypes.STRING,
      job_description:     DataTypes.STRING,
      guarantor:           DataTypes.STRING,
      pledge_image:        DataTypes.STRING,
      staff_terms:         DataTypes.TEXT,
      online: {
        type: DataTypes.ENUM,
        values: ['false', 'true'], // Enum values
        required:       true,
        defaultValue:       'false'
      },

    },
    {
        timestamps: true, // Enables createdAt and updatedAt fields
        tableName: 'profiles', // Specify the table name if different from the default
        underscored: true, // Optional: Use snake_case for column names in the database
        version: false // Disable versioning as in Mongoose
    })

    Profile.associate = (models) => {
      Profile.hasMany(models.Chat, { foreignKey: 'userId',as: 'chats' });
      Profile.hasMany(models.Inbox, { foreignKey: 'ownersId', as: 'inboxes' });
      Profile.hasMany(models.Contact, { foreignKey: 'friendId', as: 'contacts' });

    };

    return Profile
  }