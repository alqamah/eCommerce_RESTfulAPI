import { UserModel } from "../features/user/user.model.js";

const basicAuth = (req, res, next) => {

    //1. Check if the request has an authorization header, headers[] is an array
    const authHeader = req.headers['authorization'];
    console.log(authHeader);//Basic YWxxYW1hLmhhc25haW5AZ21haWwuY29tOnBhc3M=
    if(!authHeader)
        return res.status(401).send({message: 'No authorization header.'});

    //2. Extract the credentials in encoded base64 format
    const base64Credentials = authHeader.replace('Basic ', '');
    console.log(base64Credentials);//YWxxYW1hLmhhc25haW5AZ21haWwuY29tOnBhc3M=

    //3. decode the credentials
    const decodedCredentials = Buffer.from(base64Credentials, 'base64').toString('utf8');//buffer is used to decode the original string
    console.log(decodedCredentials);//alqama.hasnain@gmail.com:pass
    const creds = decodedCredentials.split(':');
    console.log(creds);////[ 'alqama.hasnain@gmail.com', 'pass' ]

    const user = UserModel.getAll().find(user => user.email == creds[0] && user.password == creds[1]);
    if(user)
        next();
    else
        return res.status(401).send({message: 'Invalid credentials.'});

}

export default basicAuth;