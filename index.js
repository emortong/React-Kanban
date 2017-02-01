const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const rootRoute = require('./routes/root');
const db = require('./models');
const Card = db.Card;


app.use(bodyParser.urlencoded({extended:true}))
// app.use(express.static('public'));

app.use('/', rootRoute);

app.listen(3033, function() {
  console.log('Started connection on port 3033');
  // db.sequelize.sync();
});

module.exports = app;
