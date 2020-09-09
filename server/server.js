var express = require('express');
var path = require('path');
var app = express();
const PORT = 3000;

app.use('/', express.static(path.resolve(__dirname, 'styles')));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../index.html'));
});

app.listen(PORT);