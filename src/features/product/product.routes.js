// Manage the paths to the product controller

import express from 'express'
import ProductController from './product.controller.js';
import {upload} from '../../middlewares/file-upload.middleware.js';
import basicAuth from '../../middlewares/basic-auth.middleware.js';

const router = express.Router();


const productController = new ProductController();

router.get('/', basicAuth, productController.getAllProduct);
router.post('/', upload.single('imageUrl'),productController.addProduct);

router.get('/getone/:id', productController.getOneProduct);

router.get('/filter',productController.filterProducts);

export default router;
