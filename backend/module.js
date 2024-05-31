const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
        trim:true
    },
    lastname:{
        type: String,
        required:true,
        trim:true
    },
    age:{
        type: Number,
        required:true,
        trim:true
    },
    dob:{
        type: Date,
        required:true,
        trim:true
    },
    email:{
        type: String,
        unique:true,
        trim:true
    },
     PhoneNumber:{
        type: Number,
        required:true,
        trim:true
    
    },
    password:{
        type: String,
        required:true,
        trim:true
    },
    confirmpassword:{
        type: String,
        required:true,
        trim:true

    }
})

const sherpuruser = new mongoose.model("Sherpuruser",userSchema);

module.exports = sherpuruser;