const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/sherpur")
.then(() =>{
    console.log("Connection succesfully ");
}).catch((err)=>{
    console.log("No connection");
})