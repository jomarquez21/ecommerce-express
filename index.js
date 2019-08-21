const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const productsApiRouter = require('./routes/api/products');
const productRouter = require('./routes/views/products');

const app = express();

// Configuracion de las vistas a usar
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Configuracion para parsear el body a json
app.set(bodyParser.json());

// Configuracion para los estaticos
app.use('/static', express.static(path.join(__dirname, 'public')));

// Redirect
app.get('/', function(req, res) {
  res.redirect('/products');
});

app.use('/products', productRouter);
app.use('/api/products', productsApiRouter);

const server = app.listen(8000, function() {
  console.log(`Listening http://localhost:${server.address().port}`);
})