require('dotenv').config();
const express = require('express');
const app = express();
// const passport = require('passport');
const routes = require('./routes');
// const controllers = require('../controllers');
const cors = require('cors');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3001;

// This encrypts after the done() is called in serialize function
app.use(bodyParser.json({ limit: '50mb' }));
// app.use(
//   cookieSession({
//     maxAge: 60 * 60 * 1000,
//     keys: [process.env.ENCRYPTION_KEY],
//   })
// );

const whitelist = ['http://localhost:3000'];

const corsOptions = {
  origin: (origin, cb) => {
    if (origin === undefined || whitelist.indexOf(origin) !== -1) {
      cb(null, true);
    } else {
      cb(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use('/api', routes);

// User hits 'sign-in' button
// app.get('/auth/google', controllers.googleOAuth2.authenticate);
// URI Route
// app.get(
//   '/auth/google/callback',
//   controllers.googleOAuth2.authenticateCallback,
//   controllers.googleOAuth2.successfulRedirect
// );

app.listen(port, () => console.log(`Server is running on port ${port}`));
