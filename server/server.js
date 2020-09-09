var express = require('express');
var path = require('path');
var app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/index.html'));
});

app.listen(PORT);