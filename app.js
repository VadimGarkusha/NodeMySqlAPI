const express = require('express');
const bodyParser = require('body-parser');
const bookRouter = require('./routers/bookRouter');
const webpack = require('webpack');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', bookRouter());
    
app.get('/', (req, res) => {
  res.send('Welcome to my API!!!');
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
