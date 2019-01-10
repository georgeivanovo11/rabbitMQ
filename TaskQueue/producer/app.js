const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

require('./src/service/rabbit-service');

const app = express();

app.use(morgan('tiny'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,userid,Request-Id,Request-Context, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

const routes = require('./src/routes/routes');

app.use('/api', routes);

app.use((err, req, res, next) => 
{
  console.log(err);
  res.status(err.status || 500);
  res.json(err);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

module.exports = app;
