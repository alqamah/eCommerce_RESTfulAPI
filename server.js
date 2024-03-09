import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from "cookie-parser";
import cors from 'cors';
import swagger from 'swagger-ui-express';
import apiDocs from './swagger.json' assert {type:'json'};
import dotenv from 'dotenv';

import cartRouter from './src/features/cart/cartItems.routes.js';
import ProductRouter from './src/features/product/product.routes.js';
import UserRouter from './src/features/user/user.routes.js';
import orderRouter from './src/features/order/order.router.js';
//import loggerMiddleware from './src/middlewares/logger.middleware.js';
import loggerMiddleware from './src/middlewares/winston-logger.middleware.js';

import {mongoDbConnection} from './src/config/mongodb.js';

const server = express();
dotenv.config(); // load the environment variables from the.env file

server.use(cors());

server.use('/api-docs', swagger.serve, swagger.setup(apiDocs));


server.use(bodyParser.json());
server.use(cookieParser());

server.use(loggerMiddleware);


server.use('/api/product',ProductRouter);
server.use('/api/user',UserRouter);
server.use('/api/cart',cartRouter);
server.use('/api/order',orderRouter);


// server.use('/',(req,res)=>{
//     res.send("Welcome to the ecom app");
// });

// server.get('/',(req, res)=>{
//     res.send("Welcome to e-commerce website");
// });

// server.use((req,res)=>{
//     res.status(404).send("Error 404. This route does not exist");
// });

server.listen(3000, ()=>{
    console.log('server listening on port 3000...');
    mongoDbConnection();
});