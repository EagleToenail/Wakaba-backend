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
    password:            DataTypes.STRING,

  })
  return User
}