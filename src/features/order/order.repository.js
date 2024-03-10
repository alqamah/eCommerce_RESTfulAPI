import { ObjectId } from "mongodb";
import { getDb } from "../../config/mongodb.js";
import orderModel from "./order.model.js";

export default class OrderRepository{
    constructor(){
        this.collection = "orders";
    }

    async placeOrder(userId){
        const db = getDb();
        // 1. Get cartitems and calculate total amount.
        const items = await this.getTotalAmount(userId);
        const amt = items.reduce((acc, item)=>acc+item.totalAmount, 0);
        console.log("Total amount: ", amt);
        
        // 2. Create an order record.
        const order = new orderModel(userId, amt, new Date());
        await db.collection(this.collection).insertOne(order);
        console.log("--order record created--");
        
        // 3. Reduce the stock.
        for (let item of items){
            await db.collection("products").updateOne(
                {_id: new ObjectId(item.productID)},
                {$inc:{stock: -item.quantity}}
            )  
        }
        console.log("--stock updated--");
        let updatedProductStockDetails = [];
        for (let item of items){
            let updatedStock = await db.collection("products").findOne({_id: new ObjectId(item.productID)});
            let item2 = {
                productID: item.productID,
                stock: updatedStock.stock
            }
            updatedProductStockDetails.push(item2);
        }
        console.log("Stock updation details:", updatedProductStockDetails);

        // 4. Clear the cart items.
    }

    async getTotalAmount(userId){
        const db = getDb();
        const items = await db.collection("cartItems").aggregate([
            // 1. Get cart items for the user
            {
                $match:{userID: new ObjectId(userId)}
            },
            // 2. Get the products form products collection.
            {
                $lookup:{
                    from:"products",
                    localField:"productID",
                    foreignField:"_id",
                    as:"productInfo"
                }
            },
            // 3. Unwind the productinfo.
            {
                $unwind:"$productInfo"
            },
            // 4. Calculate totalAmount for each cartitems.
            {
                $addFields:{
                    "totalAmount":{
                        $multiply:["$productInfo.price", "$quantity"]
                    }
                }
            }
        ]).toArray();

        let orderDetails = [];
        
        for(let item of items){
            let products = {
                productID : item.productInfo._id,
                price : item.productInfo.price,
                stock : item.productInfo.stock,
                quantity : item.quantity,
            };
            orderDetails.push(products);
        }
        console.log("Order Details:", orderDetails);
        return items;
    }
}