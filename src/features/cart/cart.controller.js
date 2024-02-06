import cartModel from "./cart.model.js";

export default class CartItemsController {    
   
    add (req,res)  {
        const {productId, quantity} = req.body;
        const userId = req.cookies.userId;
        if(!userId)
            return res.send({msg:"'invalid user"});
        const result = cartModel.add(userId, productId, quantity);
        if(result)
            return res.send({
                msg: "add successful",
                result: result
            });
        else
            return res.send({
                msg: "add failed"
            });
    }

    get (req, res) {
        const result = cartModel.get(req.cookies.userId);
        if(result)
            return res.send(result);
        else   
            return res.send({msg:"no items"});
    }
    
}