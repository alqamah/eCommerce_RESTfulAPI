import { UserModel } from "../user/user.model.js";
export default class ProductModel{
    constructor(id, name, desc, imageUrl, category, price, sizes){
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.imageUrl = imageUrl;
        this.category = category;
        this.price = price;
        this.sizes = sizes;
    }

    static getAll(){
        return products;
    }

    static add(product){
        product.id = products.length + 1;
        products.push(product);
        return product;
    }

    static getOne(id){
        const index = products.findIndex(product => product.id == id)
        if(index!=-1)
            return products[index];
        return null;
    }

    static filter(minPrice, maxPrice, catg){
        const productList = products.filter(product =>{
            return(
                (!minPrice || product.price >= minPrice)
               && (!maxPrice || product.price <= maxPrice)
               && (!catg || product.category == catg)
            )});
        if (productList.length>0)
            return productList;
        return null;
    }

    static rateProduct(userId, productId, rating){
        //1. validate user
        const user = UserModel.getAll().find(user => user.id == userId);
        if(!user)
            return "user not found!";
        //2. validate product
        const product = products.find(product => product.id == productId);
        if(!product)
            return "product not found!";
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
    new ProductModel(1, "testName", "testDesc", "testImageUrl", "testCategory", 100, ["small", "medium", "large"]),
    new ProductModel(2, "testName2", "testDesc2", "testImageUrl2", "testCategory2", 200, []),
];