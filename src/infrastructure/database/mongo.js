const mongoose = require('mongoose');

mongoose.set('strictQuery', true);
mongoose.set('bufferCommands', false);

async function connectToDatabase() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    return null;
  }

  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  return mongoose.connect(uri, {
    serverSelectionTimeoutMS: 5000
  });
}

function getDatabaseState() {
  const states = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  };

  return states[mongoose.connection.readyState] || 'unknown';
}

function isDatabaseConfigured() {
  return Boolean(process.env.MONGODB_URI);
}

module.exports = {
  connectToDatabase,
  getDatabaseState,
  isDatabaseConfigured,
  mongoose
};
