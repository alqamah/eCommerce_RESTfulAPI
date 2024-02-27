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
}

let products = [
    //id, name, desc, category, price, sizes,imageUrl
    new ProductModel("testName", "testDesc", "testImageUrl", "testCategory", 100, ["small", "medium", "large"]),
    new ProductModel("testName2", "testDesc2", "testImageUrl2", "testCategory2", 200, []),
];