const express = require('express');
const productMocks = require('./../../utils/mock/products');
const router = express.Router();

router.get('/', function(red, res) {
  // const {query: {query}} = req;
  res.status(200).json({
    data: productMocks,
    message: 'Products listed'
  });
});

router.get('/:productId', function(req, res) {
  const {params: {productId}} = req;

  res.status(200).json({
    data: productMocks[productId],
    message: 'Products retrieved'
  });
});

router.post('/', function(req, res) {
  res.status(201).json({
    data: productMocks[0],
    message: 'Products listed'
  });
});

router.put('/:productId', function(req, res) {
  const {params: {productId}} = req;
  
  res.status(200).json({
    data: productMocks[0],
    message: 'Products updated'
  });
});

router.delete('/:productId', function(req, res) {
  const {params: {productId}} = req;

  res.status(200).json({
    data: productMocks[0],
    message: 'Products deleted'
  });
});

module.exports = router;