'use strict';

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

const apiV1Router = require('../src/routes/v1.js');
const notFound = require('../src/middleware/404.js');
const errorServer = require('../src/middleware/500.js');

const Users = require('./lib/users.js');
const basicAuth = require('./lib/auth-server/basic-auth-middleware.js');
const oauth = require('./lib/auth-server/oauth-middleware.js');
const extraRouter = require('./lib/auth-server/extra-routes.js');

app.use(express.static('./public'));
app.post('/signup', (req, res, next) => {
  let user = req.body;
  let users = new Users(user);
  users.save()
    .then(result => {
      let token = users.generateToken(result);
      res.cookie('token', token, { expires: new Date(Date.now() + 12000000), httpOnly: false });
      res.status(200).json(token);
    }).catch(error => {
      console.error(`Error: invalid signup username is taken`);
      res.status(403).send('invalid signup username is taken');
    });
});

app.post('/signin', basicAuth, (req, res) => {
  res.cookie('token', req.token, { expires: new Date(Date.now() + 12000000), httpOnly: false });
  res.status(201).send(req.token);
});

app.get('/oauth', oauth, (req, res, next) => {
  res.status(200).send(req.token);
});

app.get('/users', (req, res) => {
  Users.list()
    .then(results => {
      res.status(200).json(results);
    });
});

app.use(extraRouter);
app.use('/api/v1', apiV1Router);
app.use('*', notFound);
app.use(errorServer);

module.exports = {
  server: app,
  start: port => {
    let PORT = process.env.PORT || 4000;
    app.listen(PORT, () => console.log(`My app is up and running on ${PORT}`));
  },
};