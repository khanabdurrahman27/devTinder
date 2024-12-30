const express = require('express');
const User = require("../models/user");
const {validateSignUpData} = require("../utils/validation")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const authRouter = express.Router();

authRouter.post("/signup",async (req, res)=>{
  try{
  // Validation of data
  validateSignUpData(req);

  const {firstName, lastName, emailId, password} = req.body;  //exract data from req.body
  //Encrypt the password
  const passwordHash = await bcrypt.hash(password, 10);
  //Creating a new instance of the user model
  const user = new User({
    firstName,
    lastName,
    emailId,
    password: passwordHash,
  });

  await user.save();
  res.send("User added succesfully");
  }catch(err){
    res.status(400).send("ERROR :" + err.message);
  }
});


authRouter.post("/login", async (req, res)=>{
  try{
    const {emailId, password } = req.body;
    const user = await User.findOne({emailId: emailId});
    if(!user){
      throw new Error("EmailId id is not present in DB");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(isPasswordValid){
      //Create a JWT Token
      const token = await user.getJWT();  //we can write  jwt.sign({_id: user._id},"DEV@Tinder$790",{expiresIn: "1d"});  instead of getJWT ,  getJWT come from userSchema

      // Add the token to cookie and send the response back to the user
      res.cookie("token", token,{
        expires: new Date(Date.now()+8* 3600000),    //expire cookies in 8*3600000
      });   //response to user  give token to user
      res.send("Login Successfully!!!");
    }
    else{
      throw new Error ("Password not correct");
    }
     
  }catch(err){
    res.status(400).send("ERROR : " +err.message);
  }
});

authRouter.post("/logout",async (req, res)=>{
  res.cookie("token", null, {
    expire: new Date(Date.now()),
  });
  res.send("Logout Successful!!");
});

module.exports = authRouter;