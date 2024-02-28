// //product

// import express from 'express'
// import jwtAuth from '../../middlewares/jwt-auth.middleware.js';
// import CartItemsController from './cart.controller.js';

// const router = express.Router();

// const cartController = new CartItemsController();

// router.use(jwtAuth);
// router.get('/', cartController.get);
// router.post('/', cartController.add);
// router.delete('/', cartController.delete);

// export default router;

// Manage routes/paths to ProductController

// 1. Import express.
import express from 'express';
import { CartItemsController } from './cartItems.controller.js';
import jwtAuth from '../../middlewares/jwt-auth.middleware.js';

// 2. Initialize Express router.
const cartRouter = express.Router();

const cartController = new CartItemsController();

cartRouter.use(jwtAuth);

cartRouter.delete('/:id', (req, res, next)=>{
    cartController.delete(req, res, next)
 });
cartRouter.post('/', (req, res, next)=>{
    cartController.add(req, res, next)
 });
cartRouter.get('/', (req, res, next)=>{
    cartController.get(req, res, next)
 });

export default cartRouter;
