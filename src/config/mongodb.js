import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017";

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
