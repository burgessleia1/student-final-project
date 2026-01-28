const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const dns = require('node:dns');
    dns.setServers(['8.8.8.8', '8.8.4.4']);
    const servers = dns.getServers();
    console.log('Node.js is using these DNS servers:', servers);
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  }
};

module.exports = connectDB;



