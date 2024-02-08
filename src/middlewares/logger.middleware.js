import fs from 'fs'

const fsPromise = fs.promises; //allows us to create and write data into files async

async function log(logData){
    try{
        logData = new Date().toString() +"Log Data: "+ logData;
        await fsPromise.appendFile('log.txt', logData);
    }catch(err){
        console.log(err);
    }
}

const loggerMiddleware = async (req, res, next) => {
    // Log req body
    if(req.url.includes('login'))
        next();
    const logData = `${req.url} - ${JSON.stringify(req.body)}\n`;
    await log(logData);
    next();
}

export default loggerMiddleware;