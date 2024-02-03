import { UserModel } from "./user.model.js";
import jwt from "jsonwebtoken";

export default class UserController {
    getAll(req,res){
        if(req.query.pass == 'alqama'){

            return res.status(200).send(UserModel.getAll());
        }else{
            return res.status(401).send("Unauthorized");    
        }
    }

    signUp(req, res) {  
        UserModel.signup(req.body);
        res.status(201).send("User created successfully");
    }

    signIn(req, res) {
        const user = UserModel.signin(req.body.email, req.body.password);
        if(!user)
            res.status(401).send("Invalid email or password");  
        
        //1. create a token 
        const token = jwt.sign(
            {email: user.email}, //payload
            "secretkey", //signature
            {expiresIn: '1h'} //options
        )
        
        console.log(token);
        return  res.status(201).send("User signed in successfully");
    }
}