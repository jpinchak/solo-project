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

app.get('/maxid',
  groceryController.getMaxId,
  (req, res) => {
    console.log(res.locals.unique_id);
    res.status(200).send(res.locals.unique_id);
  }
);

app.post('/additem', 
  groceryController.getMaxId,
  (req, res) => {
    res.status(200).send(res.locals.unique_id);
  }, groceryController.addItem,
  (req, res) => {
    res.status(200);
  }
);

app.delete('/deleteitem',
  groceryController.deleteItem,
  (req, res) => {
    res.status(200);
  }
)

app.listen(PORT);