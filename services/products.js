const productsMock = require('./../utils/mock/products')
const MongoLib = require('./../lib/mongo');

class ProductService {
  constructor() {
    this.collection = 'products';
    this.mongoDB = new MongoLib();
  }

  async getProducts({tags}) {
    const query = tags && {tags: {$in: tags}};
    const products = await this.mongoDB.getAll(this.collection, query);

    return products || [];
  }

  getProduct({productId}) {
    return Promise.resolve(productsMock[0]);
  }

  createProduct({product}) {
    return Promise.resolve(productsMock[0]);
  }

  updateProduct({productId, product}) {
    return Promise.resolve(productsMock[0]);
  }

  deleteProduct({productId}) {
    return Promise.resolve(productsMock[0]);
  }
}

module.exports = ProductService;