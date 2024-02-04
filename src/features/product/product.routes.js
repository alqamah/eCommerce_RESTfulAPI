//product

import express from 'express'
import ProductController from './product.controller.js';
import {upload} from '../../middlewares/file-upload.middleware.js';
import basicAuth from '../../middlewares/basic-auth.middleware.js';
import jwtAuth from '../../middlewares/jwt-auth.middleware.js';

const router = express.Router();

const productController = new ProductController();

//router.use(basicAuth);
router.use(jwtAuth);

router.get('/', productController.getAllProduct);
router.post('/', upload.single('imageUrl'),productController.addProduct);

router.get('/getone/:id', productController.getOneProduct);

router.get('/filter', productController.filterProducts);

router.get('/rating', productController.rateProduct);

export default router;
