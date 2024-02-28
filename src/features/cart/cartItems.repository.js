import { ObjectId } from 'mongodb';
import { getDb } from '../../config/mongodb.js';

export default class CartItemsRepository{
    constructor(){
        this.collection = "cartItems";
    }


    async add(productID, userID, quantity){
        try{
        const db = getDb();
        const collection = db.collection(this.collection);
        // let product = await collection.findOne({productID: new ObjectId(productID), userID: new ObjectId(userID)});
        // if(product){
        //     await collection.updateOne({_id: product._id}, { $set: { quantity: product.quantity + quantity } });
        // }else{
        //     await collection.insertOne({productID: new ObjectId(productID), userID: new ObjectId(userID), quantity}) 
        // } //or we can use the following function:
            await collection.insertOne(
                {productID: new ObjectId(productID), userID: new ObjectId(userID), quantity}, //filter expression
                {$inc:{ //increment operator
                    quantity: quantity
                }}, 
                {upsert: true} //upsert: if document exists, then update it, else create it. 
                ) 

        }catch(err){
            console.log(err);
            //throw new ApplicationError("Something went wrong with database", 500);
        }
    }

    async get(userID){
        try{
        const db = getDb();
        const collection = db.collection(this.collection);
        return await collection.find({userID: new ObjectId(userID)}).toArray();
        }catch(err){
            console.log(err);
            //throw new ApplicationError("Something went wrong with database", 500);
        }
    }

    async delete(userID, cartItemID){
        try{
        const db = getDb();
        const collection = db.collection(this.collection);
        const result = await collection.deleteOne({_id: new ObjectId(cartItemID), userID:  new ObjectId(userID)});
        return result.deletedCount>0;
        }catch(err){
            console.log(err);
            //throw new ApplicationError("Something went wrong with database", 500);
        }
    }
}