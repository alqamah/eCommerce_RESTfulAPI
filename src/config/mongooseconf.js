import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectUsingMongoose = async () => {
  const url = process.env.DB_URL;
  try{
    await mongoose.connect(url);
    //, {
    //useNewUrlParser: true,
    //useUnifiedTopology: true,
    //});
    console.log("Connected to MongoDB using Mongoose");
    }catch(err){
        console.log(err);
    }   
};


