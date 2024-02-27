import { getDb } from "../../config/mongodb.js";
import { ObjectId } from "mongodb";

export class ProductRepository {
  
   constructor() {
     this.collection = "products";
   }
  
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
  
  async getProductById(id) {
    try{
      const db = getDb();
      const collection = db.collection("products");
      return await collection.findOne({_id: new ObjectId(id)});
      //return await collection.findOne({_id:id});
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
        query.price = {...query.price,$lte: maxPrice}; //... is a spread operator, 
        //used to append the object to the existing object, rather than overwriting it
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

  async rateProduct(userId, productId, rating) {
    try{
      const db = getDb();
      const collection = db.collection("products");
      
      const product = await collection.findOne({_id: new ObjectId(productId)});
      if(product){
        if(!product.ratings){ //if ratings [] does not exist
          product.ratings = []; //then create the ratings array
          product.ratings.push({userId: userId, rating: rating}); //push the rating
        }
        const ratingInd = product.ratings.findIndex((r) => r.userId == userId); //search for the rating of the user
        if(ratingInd!= -1) //if user has already rated this product
          product.ratings[ratingInd].rating = rating; //update the rating
        else
          product.ratings.push({userId: userId, rating: rating}); //push the new or updated rating
        const upd = await collection.updateOne({ //update the product in the database
          _id: new ObjectId(productId)
        },{
          $set: {ratings: product.ratings}
        });
        if(upd.acknowledged)
          return {
            success:true,
            msg:product
          };
        else
          return {
            success:false,
            msg:"Error updating rating"
          };
      }

      return {
        success:false,
        msg:"Product not found"
      };
      // const upd = await collection.updateOne({
      //   _id: new ObjectId(productId)
      // },{
      //   //using push operator to append en element to an array: $push(element,value)
      //   $push: {ratings: {userId: userId, rating: rating}}
      // });
     
    }catch(err){
      console.log(err);
      return {
        success:false,
        msg:"Error updating rating"
      };
    }
  }
}
    