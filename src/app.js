const express = require("express");
const connectDB = require("./config/database");
const { userAuth, adminAuth } = require("./middleware/auth");
const UserModel = require("./models/user");
const app = express();

app.post("/signup", async (req, res) => {
  const userObj = {
    firstName: "Hrishikesh",
    lastName: "Wagh",
    emailId: "hrishikeshwagh123@okmail.com",
    password: "hrishi@123",
  };

  //create a instance of the model
  const user = new UserModel(userObj);
  //save the data into the database
  await user.save();
  res.status(200).send("user added successfully");
});

connectDB()
  .then(() => {
    console.log("connected to database");
    app.listen(3000, () => {
      console.log("node server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log("error connecting to database", err);
  });
