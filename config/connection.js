//  Establish connection to MongoDB database using Mongoose.
const { connect, connection } = require('mongoose');

// Connection string to the MongoDB database
const connectionString = 'mongodb://127.0.0.1:27017/social-networkDB';

// Connect to the MongoDB database
connect(connectionString);

// Export the connection
module.exports = connection;
