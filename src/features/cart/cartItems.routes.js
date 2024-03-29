
import express from 'express';
import { CartItemsController } from './cartItems.controller.js';
import jwtAuth from '../../middlewares/jwt-auth.middleware.js';

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
