const express = require("express");
const connectDB = require("./config/database");
const { userAuth, adminAuth } = require("./middleware/auth");
const UserModel = require("./models/user");
const { validateSignupData } = require("./utils/validation");

const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  try {
    //never trust the request body
    //always validate the data
    validateSignupData(req);
    //encrypt the password

    //create a instance of the model
    const user = new UserModel(req.body);
    //save the data into the database
    await user.save();
    res.status(200).send("user added successfully");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
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

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await UserModel.findByIdAndDelete(userId);
    res.status(200).send("User deleted successfully");
  } catch {
    res.status(400).send("Something went wrong!");
  }
});

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const updateData = req.body;
  try {
    const ALLOWED_UPDATES = [
      "photoUrl",
      "about",
      "gender",
      "firstName",
      "lastName",
      "age",
    ];

    const isUpdateAllowed = Object.keys(updateData).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );

    if (!isUpdateAllowed) {
      throw new Error("Update Not Allowed");
    }
    const user = await UserModel.findByIdAndUpdate(userId, updateData, {
      returnDocument: "after",
    });
    console.log(user);
    res.status(200).send("User updated successfully");
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
