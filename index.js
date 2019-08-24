const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const {config} = require('./config');
const productsApiRouter = require('./routes/api/products');
const productRouter = require('./routes/views/products');
const {logError, clientErrorHandler, errorHandler} = require('./utils/middleware/errorHandler');

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

// Error handler
app.use(logError);
app.use(clientErrorHandler);
app.use(errorHandler);

const server = app.listen(config.port, function() {
  console.log(`Listening http://localhost:${server.address().port}`);
});
