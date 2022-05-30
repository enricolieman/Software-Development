const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

class Database {
  constructor() {

    this.client = new MongoClient(process.env.DB_SERVER);
    this.init();

    this.db = this.client.db(process.env.DB_NAME)
  }
  
  async init() {
    await this.client.connect();
  }

  async search(collection, query)
  {
    var collection = this.db.collection(collection);
    var data = []
    var x = 0;
    var search = await collection.find(query).toArray();
    
    return search
    
  }

  
  async insert(collection, query)
  {
    var collection = this.db.collection(collection);
    var insert = await collection.insertOne(query);
    return insert
  }

  async count(collection)
  {
    var collection = this.db.collection(collection);
    var count = await collection.find().sort({_id:-1}).limit(1).toArray()
    if(count.length == 0)
    {
        return 0;
    }
    else
    {
    return count[0].id+1;
    }
  }
  async delete(collection, query)
  {
      console.log(query);
    var collection = this.db.collection(collection);
    var deletes = await collection.deleteOne(query);
    return deletes
  }
}

module.exports = new Database();