const {MongoClient, ObjectId} = require('mongodb');

const {config} = require('./../config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;

// const MONGO_URL = `mongodb://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/?authSource=${DB_NAME}`;
const MONGO_URL = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}:/${DB_NAME}?retryWrites=true&w=majority`;


// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://jomarquez21:<password>@cluster0-oxnjm.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

class MongoLib {
  constructor() {
    this.client = new MongoClient(MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true});
    this.dbName = DB_NAME;
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.client.connect(error => {
        if (error) {
          reject(error);
        }

        console.log("Connected succesfully to mongo");
        resolve(this.client.db(this.dbName));
      });
    });
  }

  async getAll(collection, query) {
    const db = await this.connect();

    return db
      .collection(collection)
      .find(query)
      .toArray();
  }

  async get(collection, id) {
    const db = await this.connect();

    return db.collection(collection).findOne({ _id: ObjectId(id) });
  }

  async create(collection, data) {
    const db = await this.connect();

    const result = await db.collection(collection).insertOne(data);

    return result.insertedId;
  }

  async update(collection, id, data) {
    const db = await this.connect();
    const result = await db
          .collection(collection)
          .updateOne({_id: ObjectId(id)}, {$set: data}, {upsert: true});
    
    return result.upsertedId || id;
  }

  async delete(collection, id) {
    const db = await this.connect();
    const result = await db.collection(collection).deleteOne({ _id: ObjectId(id)});
    
    return id;
  }
}

module.exports = MongoLib;
