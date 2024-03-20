import { getDb } from "../../config/mongodb.js";
import { ObjectId } from "mongodb";

import mongoose from "mongoose";
import { productSchema } from "./product.schema.js";
import {reviewSchema} from "./review.schema.js";
import {categorySchema} from "./category.schema.js";

const ProductModel = mongoose.model("Product", productSchema);
const ReviewModel = mongoose.model("Review", reviewSchema);
const CategoryModel = mongoose.model("Category", categorySchema);

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
      //1. create the new product
      const newProduct = new ProductModel(product);
      await newProduct.save();

      //2. update the categories-table
      await CategoryModel.updateMany(
        {_id: {$in: product.categories}},
        {$push: {products: product._id}}
      );
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
        //using the $in operator when an array is passed in catg
        //query.category = {$in: catg};
        //or
        //query = {...query, category: {$in: catg}}; 
      }
      const products = await collection.find(query).project({name:1, price:1, rating:{$slice:1}}).toArray();
      return products;
    }catch(err){
      console.log(err);
    }
  }

  async rate(userID, productID, rating){
    try{
        // 1. Check if product exists
        const productToUpdate = await ProductModel.findById(productID);
        if(!productToUpdate){
            throw new Error("Product not found")
        }

        // Find the existing review
        const userReview = await ReviewModel.findOne({product: new ObjectId(productID), user: new ObjectId(userID)});
        if(userReview){
            userReview.rating = rating;
            await userReview.save();
        }else{
            const newReview = new ReviewModel({
                product: new ObjectId(productID),
                user: new ObjectId(userID),
                rating: rating
            });
            newReview.save();
        }

    }catch(err){
        console.log(err);
        throw new ApplicationError("Something went wrong with database", 500);    
    }
  }



  
  async averagePricePerCatg(){
    try{
      const db = getDb();

      return await db.collection("products").aggregate([
        {
          //get avg price per catg
          $group:{ //grouping based in the fields below
            _id:"$category", //group by category
            avgPrice:{$avg:"$price"} 
          }
        }
      ]).toArray();

    }catch(err){
      console.log(err);
    }
  }

  async averageRating(){
    const db = getDb();
    return await db.collection("products").aggregate([
      //1. Create documents for ratings
      {
        $unwind:"$ratings" //unwind the ratings array
      },
      //2. Group ratings per product and get the average
      {
        $group:{
          _id:"$name",
          averageRating: { $avg: "$ratings.rating" }
        }
      }

    ]).toArray();
  }

  async countRatings(){
    const db = getDb();
    return await db.collection("products").aggregate([
      //Stage-1: Project name of Products and Rating count:
      {
        $project:{
          _id:0,
          name:1, 
          ratingsCount: {
            $cond:{
              if:{$isArray:"$ratings"},
              then:{$size:"$ratings"},
              else:0
            }
          }
        }
      },
      //Stage-2: Sort the ratings:
      {
        $sort:{ratingsCount:-1}
      },

      //Stage-3: Limit to top 3 ratings:
      {
        $limit:3
      }

    ]).toArray();
  }
  
  

}
    