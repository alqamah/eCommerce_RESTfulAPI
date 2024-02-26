import { UserModel } from "../user/user.model.js";
export default class ProductModel{
    constructor(name, desc, category, price, sizes, imageUrl){
        this.name = name;
        this.desc = desc;
        this.category = category;
        this.price = price;
        this.sizes = sizes;
        this.imageUrl = imageUrl;
    }

    static rateProduct(userId, productId, rating){
        //1. validate user
        const user = UserModel.getAll().find(user => user.id == userId);
        if(!user)
            return "user not found!";
        //2. validate product
        const product = products.find(product => product.id == productId);
        if(!product)
            throw new Error('Product not found');
        //3. create/update the rating
        if(!product.rating){ //create new rating
            product.rating = [];
            product.rating.push({
                userId: userId,
                rating: rating
            });
        }else{ //update existing rating
            const currentRatingInd = product.rating.findIndex(r => r.userId == userId);
            if(currentRatingInd==-1)
                product.rating.push({
                    userId: userId,
                    rating: rating
                })
            else
                product.rating[currentRatingInd] = {userId: userId, rating: rating};
        }
        return "rating updated";
    }
}

let products = [
    //id, name, desc, category, price, sizes,imageUrl
    new ProductModel("testName", "testDesc", "testImageUrl", "testCategory", 100, ["small", "medium", "large"]),
    new ProductModel("testName2", "testDesc2", "testImageUrl2", "testCategory2", 200, []),
];