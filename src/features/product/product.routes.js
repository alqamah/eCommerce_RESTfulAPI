// Manage the paths to the product controller

import express from 'express'
import ProductController from './product.controller.js';
import {upload} from '../../middlewares/file-upload.middleware.js';
//initialise the express routes
const router = express.Router();

const productController = new ProductController();

//after pattern matching of path till api/products/ handle the rest of the route
router.get('/', productController.getAllProduct);
router.post('/', upload.single('imageUrl'),productController.addProduct);

router.get('/getone/:id', productController.getOneProduct);

router.get('/filter',productController.filterProducts);

export default router;
