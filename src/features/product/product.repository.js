import { getDb } from "../../config/mongodb.js";

export class ProductRepository {
  
  // constructor() {
  //   this.collection = "products";
  // }
  
  async getAllProducts() {
    try{
      const db = getDb();
      const collection = db.collection("products");
      const products = await collection.find().toArray();
      return products;
    } catch(err){
      console.log(err);
    }
  }
  
  async addProduct(product) {
    try{
      const db = getDb();
      const collection = db.collection("products");
      return await collection.insertOne(product);
    }catch(err){
      console.log(err);
    }
  }
  
  async getProductById(name) {
    try{
      const db = getDb();
      const collection = db.collection("products");
      return await collection.findOne({name: name});
    }catch(err){
      console.log(err);
    }
  }
  
  async filter(minPrice, maxPrice, catg) {
    try{
      const db = getDb();
      const collection = db.collection("products");
      const query= {};
      if (minPrice){
        query.price = {$gte: minPrice};
      }
      if (maxPrice){
        query.price = {...query.price,$lte: maxPrice};
      }
      if (catg){
        query.category = catg;
      }
      const products = await collection.find(query).toArray();
      return products;
    }catch(err){
      console.log(err);
    }
  }
}
    