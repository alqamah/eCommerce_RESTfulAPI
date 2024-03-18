import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
    name: {maxLength : [25, "Name should be less than 25 characters"], type: String, required: true},
    email: {type: String, unique: true,
        match: [/.+@.+\..+/, "Please enter a valid e-mail address"]}, //using regex
    password: {type:String, required: true, 
        // validate:{
        //     validator: function(v) {
        //         return v.length >= 8;
        //     },
        //     message: "Password should be at least 8 characters"
        // }
    },
    type: {type: String, enum:["Customer", "Seller"]}
});

