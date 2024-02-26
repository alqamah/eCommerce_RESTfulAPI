import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const url = process.env.DB_URL; //from .env file

let client;
//creating a connection 
export const mongoDbConnection = () =>{
    MongoClient.connect(url)
    .then(clientInstance=>{ 
        //instance of client using which other functions can be called to perform the operations
        client = clientInstance;
        console.log("Connected to MongoDB");
    })
    .catch(err=>{
        console.log(err);
    })
}   

export const getDb = () =>{
    return client.db("ecomdb");
}
