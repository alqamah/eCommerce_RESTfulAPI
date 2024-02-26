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
        await this.userRepository.signUp(user);
        res.status(201).send(user);
    }
    
    async signIn(req, res) {
        try{
            const {email, password} = req.body;
            const result = await this.userRepository.findByEmail(email);
            if(!result)
                return res.status(401).send("Invalid email or password");
            else{
                const isPasswordMatch = await bcrypt.compare(password, result.password);
                console.log(isPasswordMatch);
                if (!isPasswordMatch)
                    return res.status(401).send("Invalid email or password");
                const token = jwt.sign(
                    {email: result.email}, //payload
                    "secretkey", //signature
                    )
                res.cookie('jwtToken',token);
                return  res.status(201).send(token);
            }
        }catch(err){
            console.log(err);
        }
    }
}


