const express = require("express");
const connectDB = require("./config/database");
const { userAuth, adminAuth } = require("./middleware/auth");
const UserModel = require("./models/user");
const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  console.log(req.body);

  //create a instance of the model
  const user = new UserModel(req.body);
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
