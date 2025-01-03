const express = require('express');
const connectDB = require("./config/database");
const app = express();
const cookieParser = require('cookie-parser');


//Middleware to convert incoming request with json file to javascript
app.use(express.json());
app.use(cookieParser());


//Import all API

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);


//Get user by email
app.get("/user",async(req, res)=>{
  const userEmail = req.body.emailId;
  try{
    const users = await User.find({emailId: userEmail});
    if(users.length ===0){
      res.status(404).send("User not found");
    }
    else{
      res.send(users);
    }
  }
  catch(err){
    res.status(400).send("Something went wrong");
  }
});
 
//Feed API - GET /feed -get all the users from the database
app.get("/feed", async (req, res)=>{
  try{
    const users = await User.find({});
    res.send(users);
  }
  catch(err){
    res.status(400).send("Something went wrong");
  }
});

// Delete a user form the database
app.delete("/user",async(req, res)=>{
  const userId = req.body.userId; 
  try{
    const user = await User.findByIdAndDelete(userId);
    res.send("User deleted successfully");
  }catch(err){
    res.status(400).send("Something went wrong");
  }
})

//Update data of the user
app.patch("/user/:userId",async(req, res)=>{
  const userId = req.params?.userId;  //userId comes from param(url) not req.body
  const data = req.body;
 
  try{
    const ALLOWED_UPDATES =[
      "photoUrl", "about","gender","age","skills"
    ];
    const isUpdateAllowed = Object.keys(data).every(k =>ALLOWED_UPDATES.includes(k));
    if(!isUpdateAllowed){
      throw new Error("Update not allowed"); 
    }


    if(data?.skills.length>10){
      throw new Error("Skills connot be more than 10");
    }


    await User.findByIdAndUpdate({_id: userId}, data,{runValidators: true,}); // runValidators of gender
    res.send("User updated successfully");
  }
  catch(err){
    res.status(400).send("UPDATE FAILED:" + err.message);
  }
});

//Connect to Database
connectDB().then(()=>{
  console.log("Database connection established...");
  //First connect to database then listen to server
  app.listen(7777, ()=>{
    console.log("Server is successfully listening on port 7777....");
  });
})
.catch(err=>{
  console.error("Database cannot be connected!!");
})

