module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type:             DataTypes.INTEGER,
      allowNull:        false,
      primaryKey:       true,
      autoIncrement:    true
    },
    store_name:          DataTypes.STRING,
    store_type:          DataTypes.STRING,
    full_name:           DataTypes.STRING,
    katakana_name:       DataTypes.STRING,
    profile_image:       DataTypes.STRING,
    email: {
      type:              DataTypes.STRING,
      unique:             true
    },
    phone_number:        DataTypes.STRING,
    password:            DataTypes.STRING,
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
  })
  // User.associate = function (models) {
  //   User.belongsTo(models.Company)
  //}
  return User
}