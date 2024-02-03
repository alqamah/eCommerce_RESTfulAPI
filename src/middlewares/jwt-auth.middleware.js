import jwt from "jsonwebtoken";

const jwtAuth = (req, res, next) =>{

    //1.) Read the token
    const jwtToken = req.headers["authorization"];
    if(!jwtToken)
        return res.status(401).send({msg:"unauthorised acces"});

    //2.) Verify the token using the secretkey used while creation 
    try{
        const payload = jwt.verify(
            jwtToken,
            'secretkey',
        );
        console.log(payload);
    }catch(err){
        return res.status(401).send({msg:"unauthorised access"});
    }

    //3.) call the next middleware
    next();
}

export default jwtAuth;