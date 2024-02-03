import express from 'express';
import bodyParser from 'body-parser';
const server = express();
import ProductRouter from './src/features/product/product.routes.js';
import UserRouter from './src/features/user/user.routes.js';

server.use(bodyParser.json());

server.use('/api/products',ProductRouter);
server.use('/api/users',UserRouter);

server.get('/',(req, res)=>{
    res.send("Welcome to e-commerce website");
})

server.listen(3000, ()=>{
    console.log('server listening on port 3000...');
})