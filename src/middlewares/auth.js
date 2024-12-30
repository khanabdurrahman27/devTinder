const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next)=>{
  
  try{

  //Read the token from the req cookies
  const cookies = req.cookies;   //user requesting cookies from cookiees-parser
  const {token} = cookies;      //Extracts the token property from the cookies object
  if(!token){
    throw new Error("Token is not valid!!!!");
  }

  //validate my token
  const decodedObj = await jwt.verify(token,"DEV@Tinder$790");      // Validates the token using the JWT library. It ensures that the token is correctly signed using the secret "DEV@Tinder$790". it decode and give user id.  
  //In real life use process.env.JWT_SECRET instead of Dev@Tinder$790

  const {_id} = decodedObj;      //Extracts id from decodemessage
  const user = await User.findById(_id);     //find id from database
  if(!user){
    throw new Error("User not found");
  }
  req.user = user;
  next();  // if user is valid then move to request handler

  }catch(err){
    res.status(400).send("ERROR: " + err.message);
  }
};

module.exports = {
  userAuth,
}