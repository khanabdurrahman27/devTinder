const express = require('express');

const app = express();

//Handle Auth Middleware for all the GET POST,.... requests

const { adminAuth, userAuth } = require('./middlewares/auth');

app.get("/admin", adminAuth);

app.post("/user/login",(req,res)=>{
  res.send("User logged in successfully");
})
 
app.get("/user",userAuth, (req,res)=>{
  res.send("User Data Sent");
});

app.get("/admin/getAllData", (req, res)=>{
    res.send('All Data Sent');
  });

app.get("/admin/deleteUser", (req, res)=>{
    res.send('Delete a user');
  });


app.use('/',(err,req,res,next)=>{
  if(err){
    //Log your error
    res.status(500).send("something went wrong");
  }
});

app.get("/getUserData",(req, res)=>{
  //try{
  //Logic of DB call and get user data
  throw new Error("dvbjfdhj");
  res.send("User Data Sent");
  // } catch (err){
  // res.status(500).send("Some Error contact support team");
  // }
});


app.use("/hello",(req, res) => {
  res.send("Hello hello hello!");
})

app.use("/test",(req, res, next) => {
  //Route Handler 1
  console.log("Handling the route user!!");
  // res.send("Hello from the server!"); // when 1 response not send then it will not send it will not send respond 2 by using next then it will send response 2;
  next();
},
(req, res)=>{
//Route Handler 2
console.log("Handling the route user 2!!");
res.send("2nd Response");
})

app.listen(3000, ()=>{
  console.log("Server is successfully listening on port 3000....");
});