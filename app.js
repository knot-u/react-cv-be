const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const projectRoutes = require('./src/interfaces/routes/projectRoutes');
const healthRoutes = require('./src/interfaces/routes/healthRoutes');
const { notFoundHandler, errorHandler } = require('./src/interfaces/middlewares/errorHandler');

const app = express();

const allowedOrigins = (process.env.CORS_ORIGIN || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    const error = new Error('Origin not allowed by CORS');
    error.statusCode = 403;
    return callback(error);
  }
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/health', healthRoutes);
app.use('/api/projects', projectRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
