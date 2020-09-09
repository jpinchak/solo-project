var express = require('express');
var path = require('path');
var app = express();
const PORT = 3000;
const groceryController = require('../controllers/groceryController');

app.use('/assets', express.static('assets'));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../index.html'));
});

app.get('/items',
  groceryController.getGroceries,
  (req, res) => {
    res.status(200).send(res.locals.groceries);
  }
);

app.listen(PORT);