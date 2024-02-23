import { getDb } from "../../config/mongodb.js";

export class UserModel{
    constructor(name, email, password, userType){
        this.name = name;
        this.email = email;
        this.password = password;
        this.userType = userType;
    }
    
    // static async signup(user){
    //     try{
    //         const db = getDb(); //gives access to the db
    //         const usersCollection = db.collection("users"); //gets the users collection/table
    //         const newUser = new UserModel(user.name, user.email, user.password, user.userType);
    //         await usersCollection.insertOne(newUser); //adds record to the users collection
    //         users.push(newUser);
    //         return newUser;
    //     }catch(err){
    //         console.log(err);
    //     }
    // }
    
    static signin(email, password){
        const user = users.find(user => user.email == email && user.password == password);
        return user;
    }
    
    static getAll(){   
        return users;
    }
}


var users = [
    {
        id: 1,
        name: "User 1",
        email: "user1@gmail.com",
        password: "PASSWORD",
        userType: "seller"
    },
    {
        id: 2,
        name: "Alqama",
        email: "alqama.hasnain@gmail.com",
        password: "pass",
        userType: "admin"
    }
]