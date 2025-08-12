const { sequelize } = require('./src/models');
require('dotenv').config();

async function resetDatabase() {
  try {
    console.log('🔄 Starting database reset...');
    
    // Force sync will drop all tables and recreate them with correct foreign key constraints
    await sequelize.sync({ force: true });
    
    console.log('📊 Database tables created:');
    console.log('- Users');
    console.log('- Profiles');
    console.log('- Customers');
    console.log('- CustomerPastVisitHistories');
    console.log('- Sales');
    console.log('- Files');
    console.log('- Chats');
    console.log('- Groups');
    console.log('- Contacts');
    console.log('- Inboxes');
    console.log('- Settings');
    console.log('- WorkingTimes');
    console.log('- Product1s, Product2s, Product3s, Product4s');
    console.log('- Inquiries');
    console.log('- Schedulers');
    console.log('- PreciousMetalsPrices');
    console.log('- Vendors');
    console.log('- Masters');
    
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