// productID, userID, quantity

export default class cartModel {
    constructor(userId, productId, quantity, id){
        this.userId = userId;
        this.productId = productId;
        this.quantity = quantity;
        this.id = id;
    }

    static get(userId){
        
        const items = cartItems.find(el => el.userId == userId);
        return items;
    }
     
    static add(userID, productID, quantity){
        const cartItem = new cartModel(userID, productID, quantity);
        cartItem.id = cartItems.length + 1;
        cartItems.push(cartItem);
        return cartItem;
    }
}

var cartItems = [
    new cartModel(1,3,2,4),
    new cartModel(2,1,2,4)
];