const express = require("express");
const connectDB = require("./config/database");
const { userAuth, adminAuth } = require("./middleware/auth");
const UserModel = require("./models/user");
const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  //create a instance of the model
  const user = new UserModel(req.body);
  //save the data into the database
  await user.save();
  res.status(200).send("user added successfully");
});

app.get("/user", async (req, res) => {
  try {
    const user = await UserModel.find({ emailId: req.body.emailId });
    if (user.length === 0) {
      return res.status(404).send("User not found");
    } else {
      res.send(user);
    }
  } catch {
    res.status(400).send("Something went wrong!");
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await UserModel.find({});
    res.send(users);
  } catch (error) {
    res.status(400).send("Something went wrong!");
  }
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
