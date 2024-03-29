//product

import express from 'express'
import ProductController from './product.controller.js';
import {upload} from '../../middlewares/file-upload.middleware.js';
import basicAuth from '../../middlewares/basic-auth.middleware.js';
import jwtAuth from '../../middlewares/jwt-auth.middleware.js';

const router = express.Router();

const productController = new ProductController();
//product
//router.use(basicAuth);
router.use(jwtAuth);

router.get('/', (req,res)=>{
    productController.getAllProduct(req,res);
});
router.post('/', upload.single('imageUrl'),(req,res)=>{
    productController.addProduct(req,res);
});

router.get('/getone/:pid', (req,res)=>{
    productController.getOneProduct(req,res);
});
router.get('/filter',(req,res)=>{ 
    productController.filterProducts(req,res);
});
router.post('/rating',(req,res)=>{
    productController.rateProduct(req,res);
});

router.get('/aggregate/averagePrice',(req,res)=>{
    productController.averagePrice(req,res);
});
router.get('/aggregate/averageRating',(req,res)=>{
    productController.averageRating(req,res);
});
router.get('/aggregate/countRatings',(req,res)=>{
    productController.countRatings(req,res);
});

export default router;
