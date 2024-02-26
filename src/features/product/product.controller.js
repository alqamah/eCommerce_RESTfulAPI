import ProductModel from './product.model.js';
import { ProductRepository } from './product.repository.js';

export default class ProductController{
    constructor(){
        this.productRepository = new ProductRepository();
    }
    async getAllProduct(req, res){
        try{
        const products = await this.productRepository.getAllProducts();
        if(products.length > 0)
            return res.status(200).send(products);
        return res.status(404).send("No products found");
        }catch(err){
            console.log(err);
            return;
        }
    }

    async addProduct(req, res){
        try{
            const {name, desc, category, price, sizes} = req.body;
            const imageUrl= req.file.filename;
            const newProduct = new ProductModel(name, desc, category, price, sizes.split(','), imageUrl);
            const record = await this.productRepository.addProduct(newProduct);
		    res.status(201).send(record);
        }catch(err){
            console.log(err);
            return;
        }
    }

    async getOneProduct(req, res){
        const name = req.params.name;
        const product = await this.productRepository.getProductById(name);
        if(product)
            res.status(201).send(product);
        else
            res.status(404).send("Product Not Found!");
    }
    
    rateProduct(req, res){
        const userId = req.query.uid;
        const productId = req.query.pid;
        const rating = req.query.r;
        try{
            const result = ProductModel.rateProduct(userId, productId, rating);
        }catch(err){
            return res.status(400).send(err.message);
        }
        return res.status(201).send({msg:result});
    }
    
    

    async filterProducts(req, res){
        try{
            let minPrice = req.query.minPrice;
            let maxPrice = req.query.maxPrice;
            let category = req.query.category;
            const products = await this.productRepository.filter(minPrice,maxPrice,category);
            if(products)
                return res.status(201).send(products);
            res.status(404).send("No matching products");
         }catch(err){
            console.log(err);
         }
    }
}