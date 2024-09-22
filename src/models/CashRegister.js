module.exports = (sequelize, DataTypes) => {
    const CashRegister = sequelize.define('CashRegister', {
      id: {
        type:             DataTypes.INTEGER,
        allowNull:        false,
        primaryKey:       true,
        autoIncrement:    true
      },
      status: {
        type: DataTypes.ENUM,
        values: ['保留中', '利用可能'],
        defaultValue: '保留中',
      },
      type: {
        type: DataTypes.STRING(30),
        defaultValue: '銀行ATM引き出し',
      },
      acceptance: {
        type: DataTypes.ENUM,
        values: ['許可', '不許可'],
        defaultValue: '不許可',
      },
      executor: DataTypes.STRING(30),
      confirmation_date: DataTypes.STRING(30),
      application_date: DataTypes.STRING(30),
      total: DataTypes.DECIMAL(60,2)
    })
    return CashRegister
  }