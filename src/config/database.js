const mongoose = require("mongoose");

//always remember it will take time so wrap it inside the async function

//connect to your DB
const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://hrishikeshwagh800:Hrishi%401999@namastenodelearn.ivwwvtd.mongodb.net/devCommunity"
  );
};

module.exports = connectDB;
//but we need to establised DB connection before we start our server
//so just do export this connectDB function and call it in your app.js file
// connectDB()
//   .then(() => {
//     console.log("connected to database");
//   })
//   .catch((err) => {
//     console.log("error connecting to database", err);
//   });
