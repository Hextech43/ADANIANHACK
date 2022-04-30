const mongoose = require("mongoose")

const {Schema, model} = mongoose

const userSchema = new Schema({
    userName:{
        type:String,
        required:[true, "Enter your NAme"]
    },
    email:{
        type:String,
        required:[true, "Enter your Email"],
        lowercase:true
    },
    password:{
        type:String,
        required:true,
        minlength:[6, "Password must be more than 6 characters"]
    }
 
},{timestamps:true})

const userModel = model("name", userSchema)


module.exports= userModel