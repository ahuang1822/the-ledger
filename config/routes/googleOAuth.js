const express = require('express');
const routes = express.Router();

routes.get('/', controllers.googleOAuth2.authenticate);
routes.get(
  '/callback',
  controllers.googleOAuth2.authenticateCallback,
  controllers.googleOAuth2.successfulRedirect
);
