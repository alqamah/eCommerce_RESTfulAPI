import ProductModel from './product.model.js';

export default class ProductController{

    getAllProduct(req, res){
        const products = ProductModel.getAll();
        res.status(200).send(products);

    }

    addProduct(req, res){
        const {name, price, sizes} = req.body;
        const newProduct = {
            name, 
            price: parseFloat(price),
            sizes: sizes.split(','),
            imageUrl: req.file.filename
        };
        const record = ProductModel.add(newProduct);
		res.status(201).send(record);
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
    
    getOneProduct(req, res){
        const id = req.params.id;
        const product = ProductModel.getOne(id);
        if(product)
            res.status(201).send(product);
        else
            res.status(404).send("Product Not Found!");
    }

    filterProducts(req, res){
        console.log(req.query);
        let minPrice = req.query.minPrice;
        let maxPrice = req.query.maxPrice;
        let category = req.query.category;
        const products = ProductModel.filter(minPrice,maxPrice,category);
        if(products)
            return res.status(201).send(products);
        res.status(404).send("No matching products");
    }
}