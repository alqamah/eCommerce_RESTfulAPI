import express from 'express';
import * as ProductRouter from './src/features/product/product.routes.js'

const server = express();

//for all routes related to products, redirect to product routes:
//use url/api/ as it's a good practice
server.use('/api/products',ProductRouter);

server.get('/',(req, res)=>{
    res.send("Welcome to e-commerce website");
})

server.listen(3000, ()=>{
    console.log('server listening on port 3000...');
})