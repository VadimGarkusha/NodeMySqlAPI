/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const bookRouter = require('./routers/bookRouter');

const app = express();
const port = process.env.PORT || 3000;

if(!process.env.NODE_ENV)
  process.env.NODE_ENV = 'Development';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', bookRouter());

app.get('/', (req, res) => {
  res.send('Welcome to my API!!!');
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

module.exports = app;
