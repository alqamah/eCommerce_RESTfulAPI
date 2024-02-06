//product

import express from 'express'
import jwtAuth from '../../middlewares/jwt-auth.middleware.js';
import CartItemsController from './cart.controller.js';

const router = express.Router();

const cartController = new CartItemsController();

//router.use(jwtAuth);
router.get('/', cartController.get);
router.post('/', cartController.add);

export default router;
