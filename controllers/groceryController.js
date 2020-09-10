const pg = require('pg');
//const { NamedModulesPlugin } = require('webpack');

const pg_link = 'postgres://jzlegnnu:9DPi_Ra50pB3orMiAvaC--O8IZldUuHu@lallah.db.elephantsql.com:5432/jzlegnnu';

const pg_client = new pg.Client(pg_link);

pg_client.connect();

const groceryController = {};

groceryController.getGroceries = (req, res, next) => {
  const groceries = 'SELECT name FROM grocery_items';
  //we def need to update this error to something that makes sense
  if(!groceries) {
    return next({
      log: 'there was an error',
      message: {err: 'there was an error'}
    });
  }
  pg_client.query(groceries)
    .then(data => {
      let grocItems = [];
      for(let it of data.rows) {
        grocItems.push(it.name);
      }
      res.locals.groceries = grocItems;
      return next();
    })
}

groceryController.addItem = (req, res, next) => {
  console.log(req.body);
  const addItem = `INSERT INTO grocery_items (name, quantity) VALUES ('${req.body.name}', ${req.body.quantity})`;
  console.log(addItem);
  res.locals.newItem = {name:"hello", quantity: "many hellos"};
  if(!req.body) {
    return next({
      log: "there was an error",
      message: {err: "you know as much about this as I do, probably"}
    });
  }
  pg_client.query(addItem)
    .then(data => {
      return next();
    });
}

module.exports = groceryController;