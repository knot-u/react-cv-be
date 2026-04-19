require('dotenv').config();

const http = require('http');
const app = require('./app');
const { connectToDatabase } = require('./src/infrastructure/database/mongo');

const port = Number(process.env.PORT) || 3000;
app.set('port', port);

async function startServer() {
  try {
    await connectToDatabase();
  } catch (error) {
    process.stderr.write(`Database connection failed: ${error.message}\n`);
  }

  const server = http.createServer(app);
  server.listen(port);
}

startServer();
