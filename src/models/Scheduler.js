module.exports = (sequelize, DataTypes) => {
    const Scheduler = sequelize.define('Scheduler', {
        id: {
          type: DataTypes.BIGINT,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
            },
        user_id: {
            type: DataTypes.STRING,
            required: true,
          },
        store_name: DataTypes.STRING,
        text: DataTypes.STRING,
        start_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
          },
        end_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
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
      return Scheduler;
}