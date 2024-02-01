// Manage the paths to the product controller

import express from 'express'
import ProductController from './product.controller';

//initialise the express routes
const router = express.Router();

const productController = new ProductController();

//after pattern matching of path till api/products/ handle the rest of the route
router.get('/',productController.getAllProduct);
router.post('/',productController.addProduct);




export default router;
