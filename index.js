const express = require('express');
const path = require('path');
const productsApiRouter = require('./routes/api/products')
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();

// Configuracion de las vistas a usar
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Configuracion para parsear el body a json
app.set(bodyParser.json());

app.use('/static', express.static(path.join(__dirname, 'public')));

const products = [
  {name: 'Red shoes', price: 75, image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0e44599932dce6b8440e26fb91e10a69&auto=format&fit=crop&w=800&q=60"},
  {name: 'Black bike', price: 300, image: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=53d820e6622fadd53b8638d60f468ccd&auto=format&fit=crop&w=800&q=60"},
];

const productRouter = router.get('/', function(req, res) {
  res.render('products', {products});
});

app.get('/', function(req, res) {
  res.send({Hello: "word"});
});

app.use('/products', productRouter);
app.use('/api/products', productsApiRouter);

const server = app.listen(8000, function() {
  console.log(`Listening http://localhost:${server.address().port}`);
})