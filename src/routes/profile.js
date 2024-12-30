const express = require('express');
const{ userAuth } = require("../middlewares/auth");


const profileRouter = express.Router();

profileRouter.get("/profile",userAuth, async(req,res)=>{
  try{
  const user = req.user;
  res.send(user);  //If it match id with token id then send response to user
}catch(err){
  res.status(400).send("ERROR : " +err.message);
}
});


module.exports = profileRouter;