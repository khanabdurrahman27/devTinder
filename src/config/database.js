const mongoose = require('mongoose');

const connectDB = async()=>{
  await mongoose.connect("mongodb+srv://azmiabdurrahmankhan:LDFfoa2yWs6qjJgJ@namastenode.pawaf.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
