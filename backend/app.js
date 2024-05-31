const express = require("express");
require("../backend/dbconnect");
const Sherpuruser = require("../backend/module");
const app = express();
const path=require("path");
const hbs=require('hbs');
const validator = require("express-validator");
const sherpuruser = require("../backend/module");
const port = process.env.PORT || 7000;

const frontend_path = path.join(__dirname,"../frontend/views");
const static_path = path.join(__dirname,"../public");

app.set("view engine",'hbs');
app.use(express.static(frontend_path));
app.use(express.static(static_path));
app.use(express.json());

app.use(express.urlencoded({extended:true}));


app.set("views",frontend_path);
hbs.registerPartials("frontend_path");

app.get("",(req,res)=>{
    res.render("index");
})

app.get("/panchayat",(req,res)=>{
    res.render("panchayat");
})

app.get("/panchayatCourt",(req,res)=>{
    res.render("court");
})

app.get("/gallery",(req,res)=>{
    res.render("gallery");
})

app.get("/contact",(req,res)=>{
    res.render("contact");
})

app.get("/login",(req,res)=>{
    res.render("login");
})

app.get("/register",(req,res)=>{
    res.render("register");
})

app.post("/register",async(req,res)=>{
    try{
        const {email,PhoneNumber}=req.body;
        const useremail = await sherpuruser.findOne({email});
        if(useremail){
           return res.status(400).json({message:"email already register"})
        }

        const userphone = await sherpuruser.findOne({PhoneNumber});
        if(userphone){
           return res.status(400).json({message:"phone number allready register"})
        }

        const password= req.body.password;
        const confpass= req.body.confirmpassword;

        if(password==confpass){
        const registerSherpur = new Sherpuruser({
            name : req.body.name,
            lastname:req.body.lastname,
            age:req.body.age,
            dob:req.body.dob,
            email:req.body.email,
            PhoneNumber:req.body.PhoneNumber,
            password:req.body.password,
            confirmpassword:req.body.confirmpassword,   
         })

         const registered= await registerSherpur.save();
          res.status(201).render("succ_reg")
            
        }
        else{
            res.send("password not match");
        } 
    }catch(err){
        //res.status(400).send(err);

        res.status(201).send(err);
       }
})

app.post("/login", async(req,res) => {
    try{
    const usemail= req.body.email;
    const uspassword = req.body.password;

    const useremail = await sherpuruser.findOne({email:usemail});
  
        
        if(useremail.email === usemail && useremail.password === uspassword)
        {
            res.render("index");
        }
        else{
            res.send("invalid error");
        }
    }
    catch(err){
        res.send("invalid email");
    }
     
 });


 app.get("*",(req,res)=>{
    res.render("error");
})


app.listen(port,() =>{
    console.log('connection is live at port no.',port);
})

