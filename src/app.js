const express = require('express');
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json());
//Create a API
app.post("/signup",async (req, res)=>{
  console.log();
  //Creating a new instance of the user model
  const user = new User(req.body);

  try{
  await user.save();
  res.send("User added succesfully");
  }catch(err){
    res.status(400).send("Error saving the user:" + err.message);
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

