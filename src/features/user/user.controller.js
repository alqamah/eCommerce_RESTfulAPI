import { UserModel } from "./user.model.js";
import jwt from "jsonwebtoken";
import  UserRepository  from "./user.repository.js";
import bcrypt from "bcrypt";

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
        const {name, email, password, userType} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10); //plain-text-pwd, salt-rounds(10 - 20)
        const user = new UserModel(name, email, hashedPassword, userType);
        try{
            await this.userRepository.signUp(user);
            res.status(201).send(user);
        }catch(err){
            if(err.code === 11000)
                return res.status(400).send("Email already exists");
            console.log(err);
            res.status(400).send("error");
        }
    }
    
    async signIn(req, res) {
        try{
            const {email, password} = req.body;
            const result = await this.userRepository.findByEmail(email);
            if(!result)
                return res.status(401).send("Invalid email or password");
            else{
                const isPasswordMatch =  bcrypt.compare(password, result.password);
                if (!isPasswordMatch)
                    return res.status(401).send("Invalid email or password");
                const token = jwt.sign(
                    {email: result.email},
                    process.env.JWT_SECRET_KEY, 
                    { expiresIn: '1h' }
                );
                res.cookie('jwtToken',token);
                res.cookie('uid',result._id); 
                return  res.status(201).send("user signed in successfully");
            }
        }catch(err){
            console.log(err);
        }
    }
}


