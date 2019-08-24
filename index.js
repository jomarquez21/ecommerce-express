const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const boom = require('boom');

const {config} = require('./config');
const productsApiRouter = require('./routes/api/products');
const authApiRouter = require('./routes/api/auth');
const productRouter = require('./routes/views/products');
const {logError, clientErrorHandler, errorHandler, wrapErrors} = require('./utils/middleware/errorHandler');
const isRequestAjaxOrApi = require('./utils/isRequestAjaxOrApi');

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
app.use('/api/auth', authApiRouter);

app.use(function(req, res, next) {
  if (isRequestAjaxOrApi(req)) {
    const {output: {statusCode, payload}} = boom.notFound();

    res.status(statusCode).json(payload);
  }

  res.status(404).render('404');
});

// Error handler
app.use(logError);
app.use(wrapErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

const server = app.listen(config.port, function() {
  console.log(`Listening http://localhost:${server.address().port}`);
});
