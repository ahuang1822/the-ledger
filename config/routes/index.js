const express = require('express');
const routes = express.Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

routes.get('/', (req, res) => res.send('The ledger API has been activated'));
routes.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['openid', 'profile', 'email'],
  })
);

module.exports = routes;
