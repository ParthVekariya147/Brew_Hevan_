const mongoose = require('mongoose');
const dns = require('dns');

// Configure DNS to use Google's public DNS servers
dns.setServers(['8.8.8.8', '8.8.4.4']);

const options = {
    retryWrites: true,
    w: 'majority',
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    family: 4, // Use IPv4, skip trying IPv6
};

console.log('Attempting to connect to MongoDB Atlas...');
console.log('Connection string:', process.env.DATABASE);

mongoose.connect(process.env.DATABASE, options)
    .then(() => {
        console.log('✅ Database connected successfully');
        console.log('Connected to:', mongoose.connection.name);
    })
    .catch((err) => {
        console.error('❌ Database connection error:');
        console.error('Error type:', err.name);
        console.error('Error message:', err.message);
        console.error('Full error:', err);
    });