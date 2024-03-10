import { ObjectId } from "mongodb";
import { getDb } from "../../config/mongodb.js";

export default class OrderRepository{
    constructor(){
        this.collection = "orders";
    }

    async placeOrder(userId){

        // 1. Get cartitems and calculate total amount.
        const amt = await this.getTotalAmount(userId);
        return amt;
        // 2. Create an order record.

        // 3. Reduce the stock.

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
        //console.log(items);
        const finalTotalAmount = items.reduce((acc, item)=>acc+item.totalAmount, 0)
        console.log("Total Amount:",finalTotalAmount);
        return finalTotalAmount;
    }
}