const { sequelize } = require('./src/models');
require('dotenv').config();

async function resetDatabase() {
  try {
    console.log('🔄 Starting database reset...');
    
    // Force sync will drop all tables and recreate them
    await sequelize.sync({ force: true });
    
    console.log('✅ Database reset completed successfully!');
    console.log('📋 All tables have been recreated with correct foreign key constraints.');
    
  } catch (error) {
    console.error('❌ Database reset failed:', error);
  } finally {
    await sequelize.close();
    process.exit(0);
  }
}

resetDatabase(); 