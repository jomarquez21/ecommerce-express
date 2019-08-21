const express = require('express');

const ProductService = require('./../../services/products');

const router = express.Router();

const productService = new ProductService();

const response = (data, message) => ({data, message});

router.get('/', async function(req, res, next) {
  // const {query: {query}} = req;
  const {query: {tags}} = req;

  try {
    const data = await productService.getProducts({tags});
    
    res.status(200).json(response(data, 'Products listed'));
  } catch (error) {
    next(error);
  }
});

router.get('/:productId', async function(req, res) {
  const {params: {productId}} = req;

  try {
    const data = await productService.getProduct({productId});
    
    res.status(200).json(response(data, 'Products retrieved'));
  } catch (error) {
    next(error);
  }
});

router.post('/', async function(req, res) {
  const {body: product} = req;

  try {
    const data = await productService.createProduct({product});
    
    res.status(201).json(response(data, 'Products created'));
  } catch (error) {
    next(error);
  }
});

router.put('/:productId', async function(req, res) {
  const {params: {productId}, body: product} = req;

  try {
    const data = await productService.updateProduct({productId, product});
    
    res.status(200).json(response(data, 'Products updated'));
  } catch (error) {
    next(error);
  }
});

router.delete('/:productId', async function(req, res) {
  const {params: {productId}} = req;

  try {
    const data = await productService.deleteProduct({productId});
    
    res.status(200).json(response(data, 'Products deleted'));
  } catch (error) {
    next(error);
  }
});

module.exports = router;