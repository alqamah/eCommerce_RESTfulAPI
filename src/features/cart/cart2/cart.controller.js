// Please don't change the pre-written code
// Import the necessary modules here

import * as cartModel from "../model/cart.model.js";

export const addToCartController = (req, res) => {
  // Write your code here
  const userId = req.userId;
  const productId = Number(req.query.productId);
  const quantity = Number(req.query.quantity);
  const result = cartModel.addToCart(userId, productId, quantity);
  if(result)
  return res.status(201).send({
    "success": true,
    "item": result
  });
  return res.status(400).send({msg: "error"});
  
};

export const removeFromCartController = (req, res) => {
  // Write your code here
  const cid = req.params.itemId;
  const uid = req.userId;
  const result = cartModel.removeFromCart(uid, cid);
  if(result)
    return res.status(200).send({
      "success": true,
      "deletedCartItem": result
    });
  return res.status(404).send({
    "success": false,
    "msg": "operation not allowed"
  });
};

export const getItems = (req, res) => {
  // Write your code here
  const uid = req.userId;
  const result = cartModel.getAll(uid);
  res.send(result);
};
