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
        //createCounter(client.db("ecomdb"));
        createIndexes(client.db("ecomdb"));
        console.log("Connected to MongoDB");
    })
    .catch(err=>{
        console.log(err);
    })
}   

export const getClient = () =>{
    return client;
}

export const getDb = () =>{
    return client.db("ecomdb");
}

// const createCounter = async (db) => { 

//     const existingCounter = await db.collection("counters").findOne({ _id: 'cartItemId' });
//     if(!existingCounter){
//         await db.collection("counters").insertOne({ _id: 'cartItemId', value: 0 });
//     }
// }

const createIndexes = async(db) =>{
    try{
        await db.collection("products").createIndex({ price:1});
        await db.collection("products").createIndex({name:1, category:-1});
        //console.log("price index created");
    }catch(err){
        console.log(err);
    }
}