import OrderRepository from "./order.repository.js";


export default class OrderController{
    constructor(){
        this.orderRepository = new OrderRepository();
    }

    async placeOrder(req, res, next){
        try{
        const userId = req.cookies.uid;
            const amt = await this.orderRepository.placeOrder(userId);
            res.status(201).send(`Order placed successfully.`);
        }catch(err){
            console.log(err);
            return res.status(200).send("Something went wrong");
        }
    }
}