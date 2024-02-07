// Please don't change the pre-written code
// Import the necessary modules here
let cartId = 0;
export class cartModel {
  constructor(userId, productId, quantity) {
    this.id = ++cartId;
    this.userId = userId;
    this.productId = productId;
    this.quantity = Number(quantity);
  }
}
const cartItems = [new cartModel(1, 2, 5), new cartModel(3, 3, 10)];

export const addToCart = (userId, productId, quantity) => {
  // Write your code here
  let ind = cartItems.findIndex(i => i.productId == productId && i.userId == userId);
  if(ind==-1){
    const new_prod = new cartModel (userId, productId, quantity);
    cartItems.push(new_prod);
  }
  else{
    cartItems[ind].quantity = quantity;
  }
  return cartItems.filter(i => (i.userId == userId));
};

export const removeFromCart = (userId, cartItemId) => {
  // Write your code here
  const resInd = cartItems.findIndex(i => i.userId == userId && i.id == cartItemId);
  if(resInd ==-1)
    return false;
  const delItem = cartItems.splice(resInd,1);
  return delItem;
  
};

export const getAll = (userId) => {
  // Write your code here
  return cartItems.filter(i => (i.userId == userId));  
};

