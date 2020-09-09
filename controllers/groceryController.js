const pg = require('pg');
const { NamedModulesPlugin } = require('webpack');

const pg_link = 'postgres://jzlegnnu:9DPi_Ra50pB3orMiAvaC--O8IZldUuHu@lallah.db.elephantsql.com:5432/jzlegnnu';

const pg_client = new pg.Client(pg_link);

pg_client.connect();

const groceryController = {};

groceryController.getGroceries = (req, res, next) => {
  const groceries = 'SELECT * FROM grocery_items';
  //we def need to update this error to something that makes sense
  if(!groceries) {
    return next({
      log: 'there was an error',
      message: {err: 'there was an error'}
    })
  }
  pg_client.query(groceries)
    .then(data => {
      console.log(typeof data.rows[0]);
      res.locals.groceries = data.rows[0];
      return next();
    })
}

module.exports = groceryController;