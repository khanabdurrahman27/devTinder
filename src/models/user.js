const mongoose = require('mongoose');
var validator = require('validator');
const jwt = require("jsonwebtoken");



const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 4,
    maxLength: 50,
  },
  lastName:{
    type:String,
  },
  emailId:{
    type:String,
    lowercase: true, // email in lowercase
    required: true,
    unique: true,
    trim: true, // not showing spaces
    validate(value){  // before using validate download  npm i validator
      if(!validator.isEmail(value)){
        throw new Error("Invalid email address: " + value); 
    }
  },
  },
  password:{
    type:String,
    required: true,
    validate(value){  // before using validate download  npm i validator
      if(!validator.isStrongPassword(value)){
        throw new Error("Enter a Strong Password: " + value); 
    }
  },
  },
  age:{
    type:Number,
    min: 18,
  },
  gender:{
    type:String,
    validate(value){
      if(!["male", "female", "other"].includes(value)){
        throw new Error("Gender data is not valid");   //this validate data is only using when u create new data in database 
      }
    }, 
  },
  photoUrl:{
    type: String,
    default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    validate(value){  
      if(!validator.isURL(value)){
        throw new Error("Invalid Photo URL: " + value); 
    }
  },

  },
  about:{
    type: String,
    default: "This is a default about of the user"
  },
  skills:{
    type: [String],
  },
  
},
{
  timestamps: true,
}
);

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({_id: user._id},"DEV@Tinder$790",{expiresIn: "1d"}); //DEV@Tinder$790 is a secret key and expire in 1 day
  return token;
};


const User = mongoose.model("User", userSchema);

module.exports = User;