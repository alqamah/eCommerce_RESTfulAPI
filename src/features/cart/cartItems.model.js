// productID, userID, quantity

export default class cartModel {
    constructor(userId, productId, quantity, id){
        this.userId = userId;
        this.productId = productId;
        this.quantity = quantity;
        this.id = id;
    }

//     static get(userId){
        
//         const items = cartItems.find(el => el.userId == userId);
//         return items;
//     }
     
//     static add(userID, productID, quantity){
//         const cartItem = new cartModel(userID, productID, quantity);
//         cartItem.id = cartItems.length + 1;
//         cartItems.push(cartItem);
//         return cartItem;
//     }

//     static delete(userId, productId){
//         const ind = cartItems.findIndex(el => el.userId == userId && el.productId == productId)
//         if(ind==-1)
//             return false;
//         cartItems.splice(ind,1);
//         console.log(cartItems);
//         return true;
//     }
 } 

// var cartItems = [
//     //uid, pid, qty, id (cart)
//     new cartModel(1,3,2,1),
//     new cartModel(2,1,2,2),
//     new cartModel(2,2,2,3)
// ];