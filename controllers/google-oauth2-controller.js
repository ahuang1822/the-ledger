const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const host = process.env.PRODUCTION_SERVER || process.env.DEV_SERVER;
const models = require('../models');

const verifyCallback = async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await models.User.findOne({
      where: {
        googleId: profile.id,
      },
    });
    if (!user) {
      user = await models.User.create({
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        email: profile.emails[0].value,
        googleId: profile.id,
      });
    }
    done(null, user);
  } catch (err) {
    return done(err, false);
  }
};

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK,
    },
    verifyCallback
  )
);

const authenticate = passport.authenticate('google', {
  scope: ['profile', 'email'],
});

const authenticateCallback = passport.authenticate('google');

const successfulRedirect = (req, res) => {
  res.redirect(host);
};

module.exports = {
  authenticate,
  authenticateCallback,
};
