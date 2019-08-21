const express = require('express');

const ProductService = require('./../../services/products');

const router = express.Router();

const productService = new ProductService();

router.get('/', async function(req, res, next) {
  const {query: {tags}} = req;

  try {
    const products = await productService.getProducts({tags});
    
    res.render('products', {products});
  } catch (error) {
    next(error);
  }
});

module.exports = router;