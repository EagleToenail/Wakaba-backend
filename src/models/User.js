module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type:             DataTypes.INTEGER,
      allowNull:        false,
      primaryKey:       true,
      autoIncrement:    true
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
      type:              DataTypes.STRING,
      unique:             true
    },
    password:            DataTypes.STRING(255),
    full_name:           DataTypes.STRING(30),
    store_name:         DataTypes.STRING(30),
    role_flag:           DataTypes.STRING(20),
  })

  User.associate = (models) => {
    //   User.hasMany(models.TodoMessage, { foreignKey: 'senderId',as:'SentMessages'});
    //   User.hasMany(models.TodoMessage, { foreignKey: 'receiverId',as:'ReceivedMessages'});
    User.hasMany(models.WorkingTime, { foreignKey: 'userId' });
    User.hasMany(models.Profile, { foreignKey: 'user_id' });
  };

  return User
}