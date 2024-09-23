module.exports = (sequelize, DataTypes) => {
    const Inquiry = sequelize.define('Inquiry', {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        user_id: {
            type: DataTypes.STRING,
            required: true,
          },
        telcount: {
          type: DataTypes.INTEGER,
          defaultValue: 0
        },
        visitcount: {
            type: DataTypes.INTEGER,
            defaultValue: 0
          },
        createdAt: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW
        },
        updatedAt: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW
        }
      });
      return Inquiry;
}