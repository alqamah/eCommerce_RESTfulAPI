import { getDb } from "../../config/mongodb.js";

export default class UserRepository { 
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

    async findByEmail(email) {
        try{
            const db = getDb();
            const collection = db.collection("users");
            const result = await collection.findOne({email});
            return result;
        } catch(err){
            console.log(err);
        }
      }
}