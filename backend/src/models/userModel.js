const { required } = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required: true,
        unique:true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        // required: true
    },
    mobile: {
        type:String,
        
    },
    role: {
        type:String,
        default:"User"
    }
    
    
},{timestamps:true});

module.exports = mongoose.model("User", userSchema, "User");



