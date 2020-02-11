'use strict'
require('dotenv').config();
const express = require('express');
const serverless = require('serverless-http');
const netlifyFunctionsPath = require('./lib/netlifyFunctionsPath');

const app = express();
const router = express.Router();

router.get('/', (_, res) => {
  res.json({
    message: 'サンプルのページです。'
  });
});

app.use((_, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.CORS);
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header('X-Frame-Options', 'SAMEORIGIN')
  res.header('X-XSS-Protection', '1; mode=block');
  res.header('X-Content-Type-Options', 'nosniff');
  res.header('Strict-Transport-Security', 'max-age=86400');
  next();
})

app.use(netlifyFunctionsPath, router);

module.exports = app;
module.exports.handler = serverless(app);
