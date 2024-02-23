import { getDb } from "../../config/mongodb.js";

export class UserRepository { 
    async signUp(newUser){
        try{
            const db = getDb(); //gives access to the db
            const usersCollection = db.collection("users"); //gets the users collection/table
            await usersCollection.insertOne(newUser); //adds record to the users collection
            return newUser;
        }catch(err){
            console.log(err);
        }
    }
}