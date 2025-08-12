const os = require('os');

console.log('🌐 Network Configuration Check:');
console.log('================================');

// Get all network interfaces
const networkInterfaces = os.networkInterfaces();

console.log('\n📡 Available Network Interfaces:');
Object.keys(networkInterfaces).forEach((interfaceName) => {
  const interfaces = networkInterfaces[interfaceName];
  interfaces.forEach((interface) => {
    if (interface.family === 'IPv4') {
      console.log(`  ${interfaceName}: ${interface.address} (${interface.internal ? 'internal' : 'external'})`);
    }
  });
});

console.log('\n🏠 Hostname:', os.hostname());
console.log('🖥️  Platform:', os.platform());
console.log('📦 Architecture:', os.arch());

console.log('\n💡 Recommended Configuration:');
console.log('  - Use 0.0.0.0 to bind to all interfaces');
console.log('  - Use localhost or 127.0.0.1 for local access');
console.log('  - Use your public IP for external access');

console.log('\n🔧 Environment Variables:');
console.log('  PORT:', process.env.PORT || 'not set (will use default: 3000)');
console.log('  NODE_ENV:', process.env.NODE_ENV || 'not set'); 