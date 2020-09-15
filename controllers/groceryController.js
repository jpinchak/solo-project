const pg = require('pg');
//const { NamedModulesPlugin } = require('webpack');

const pg_link = 'postgres://jzlegnnu:9DPi_Ra50pB3orMiAvaC--O8IZldUuHu@lallah.db.elephantsql.com:5432/jzlegnnu';
const pg_client = new pg.Client(pg_link);
pg_client.connect();

const groceryController = {};

groceryController.getMaxId = (req, res, next) => {
  const unique_id_query = 'SELECT MAX(unique_id) from grocery_items;'
  pg_client.query(unique_id_query)
  .then(id => {
    let uniqueid = id.rows[0].max;
    res.locals.unique_id = [uniqueid + 1]; 
    return next();
  });
  return next();
}

groceryController.getGroceries = (req, res, next) => {
  const groceries = 'SELECT name, quantity, unique_id FROM grocery_items';
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
        grocItems.push({
          itemName: it.name,
          quantity: it.quantity,
          uniqueId: it.unique_id
        });
      }
      res.locals.groceries = grocItems;
      return next();
    })
}

groceryController.addItem = (req, res, next) => {
  let unique_id = res.locals.unique_id[0];
  const addItem = `INSERT INTO grocery_items (name, quantity, unique_id) VALUES ('${req.body.name}', ${req.body.quantity}, ${unique_id})`;
  unique_id += 1;
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

groceryController.updateItem = (req, res, next) => {
  let count = parseInt(req.body.quantity);
  console.log(count);
  console.log(req.body.name);
  const updateRequest = `UPDATE grocery_items SET quantity = ((SELECT quantity FROM grocery_items WHERE name = '${req.body.name}') + ${count}) WHERE name = '${req.body.name}';`
  pg_client.query(updateRequest)
    .then(data => {
      return next();
    });
}

groceryController.deleteItem = (req, res, next) => {
  console.log('delete item ', req.body.index);
  const deleteReq = `DELETE FROM grocery_items WHERE unique_id = ${req.body.index}`;
  pg_client.query(deleteReq)
    .then(data => {
      return next();
    })
}

// groceryController.itemExists = (req, res, next) => {
//   const checkItem = `SELECT EXISTS(SELECT * FROM grocery_items WHERE name = ${req.params.name});`
//   pg_client.query(checkItem)
//     .then(bool => {
//       res.locals.itemExists = bool;
//       return next();
//     });
// }

module.exports = groceryController;