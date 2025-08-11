const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize({
  database: process.env.DB_NAME || "wakaba",
  user: process.env.DB_USER || "wakaba",
  password: process.env.DB_PASS || "Wakaba_password123QWE!@#QWE",
  dialect: process.env.DIALECT || "mysql",
  host: process.env.HOST || "localhost",
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection successful!');
    
    // Test creating a table
    await sequelize.sync({ force: false });
    console.log('✅ Database sync completed!');
    
  } catch (error) {
    console.error('❌ Database connection failed:', error);
  } finally {
    await sequelize.close();
  }
}

testConnection(); 