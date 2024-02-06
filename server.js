import express from 'express';
import bodyParser from 'body-parser';
const server = express();
import cookieParser from "cookie-parser";

import CartRouter from './src/features/cart/cart.routes.js'
import ProductRouter from './src/features/product/product.routes.js';
import UserRouter from './src/features/user/user.routes.js';


server.use(bodyParser.json());
server.use(cookieParser());

server.use('/api/product',ProductRouter);
server.use('/api/user',UserRouter);
server.use('/api/cart',CartRouter);

server.get('/',(req, res)=>{
    res.send("Welcome to e-commerce website");
})

server.listen(3000, ()=>{
    console.log('server listening on port 3000...');
})