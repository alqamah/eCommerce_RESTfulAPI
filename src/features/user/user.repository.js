import mongoose from "mongoose";

//import the schema 
import { userSchema } from "./user.schema.js";

//create the model from the schema
const UserModel = mongoose.model("User", userSchema);

export default class UserRepository{
    async signUp(user){
        try{
            //create instance of the Model
            const newUser = new UserModel(user);
            //save the user
            await newUser.save();
            return newUser;
        }catch(err){
            throw err;
            //console.log(err);
        }
    }

    async findByEmail(email, password){
        try{
            const user = await UserModel.findOne({email});
            return user;
        }catch(err){
            throw err;
        }
    }

    async resetPassword(id, password){
        try{
            let user = await UserModel.findById(id);
            user.password = password;
            await user.save();
        }catch(err){
            throw err;
        }
    }


}

