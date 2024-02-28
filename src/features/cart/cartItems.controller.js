import CartItemModel from "./cartItems.model.js";
import CartItemsRepository from "./cartItems.repository.js";

export class CartItemsController {
    
    constructor(){
        this.cartItemsRepository = new CartItemsRepository();
    }

    async add(req, res) {
        try{
            const { productID, quantity } = req.body;
            const userID = req.cookies.uid;
            await this.cartItemsRepository.add(productID, userID, quantity);
            res.status(201).send("Cart is updated");
        }catch(err){
            console.log(err);
            return res.status(200).send("Something went wrong");
           }    
    }

    async get(req, res){
        try{
            const userID = req.cookies.uid;
            const items = await this.cartItemsRepository.get(userID);
            return res.status(200).send(items);
        }catch(err){
            console.log(err);
            return res.status(200).send("Something went wrong");
           }   
    }

    async delete(req, res) {
        const userID = req.cookies.uid;
        const cartItemID = req.params.id;
        const isDeleted = await this.cartItemsRepository.delete(
            userID,
            cartItemID
        );
        if (!isDeleted) {
            return res.status(404).send("Item not found");
        }
        return res
        .status(200)
        .send('Cart item is removed');
    }
}