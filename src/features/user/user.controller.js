import { UserModel } from "./user.model.js";
import jwt from "jsonwebtoken";
import  {UserRepository}  from "./user.repository.js";

export default class UserController {
    constructor() {
        this.userRepository = new UserRepository();
    }
    getAll(req,res){
        if(req.query.pass == 'alqama'){

            return res.status(200).send(UserModel.getAll());
        }else{
            return res.status(401).send("Unauthorized");    
        }
    }

    async signUp(req, res) {  
        // try{
        //     const result = await UserModel.signup(req.body);
        //     if(result)
        //         return res.status(201).send(result);
        // }catch(err){
        //     console.log(err);
        //     return res.status(400).send("Error");
        // } 
        const {name, email, password, userType} = req.body;
        const user = new UserModel(name, email, password, userType);
        await this.userRepository.signUp(user);
        res.status(201).send(user);
    }

    signIn(req, res) {
        const user = UserModel.signin(req.body.email, req.body.password);
        if(!user)
            res.status(401).send("Invalid email or password");  
        
        //1. create a token 
        const token = jwt.sign(
            {email: user.email}, //payload
            "secretkey", //signature
        )
        res.cookie('jwtToken',token);
        return  res.status(201).send("User signed in successfully");
    }
}