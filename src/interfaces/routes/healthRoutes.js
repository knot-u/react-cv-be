const express = require('express');
const { getDatabaseState, isDatabaseConfigured } = require('../../infrastructure/database/mongo');

const router = express.Router();

router.get('/', (_req, res) => {
  res.status(200).json({
    data: {
      status: 'ok',
      database: getDatabaseState(),
      configured: isDatabaseConfigured()
    },
    error: null
  });
});

module.exports = router;
