const express = require("express");
const connectDB = require("./config/database");
const { userAuth, adminAuth } = require("./middleware/auth");
const UserModel = require("./models/user");
const { validateSignupData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  try {
    //never trust the request body
    //always validate the data
    validateSignupData(req);
    const { firstName, lastName, emailId, password } = req.body;
    //encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);

    //create a instance of the model
    const user = new UserModel({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
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
    res.status(200).send("User updated successfully");
  } catch (error) {
    res.status(400).send("Something went wrong!");
  }
});

// login api for the user login
app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await UserModel.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      //JWT token generation

      const token = await jwt.sign({ _id: user._id }, "DEV@Community$1799");
      //add the token to the cookie and send the response back to user
      res.cookie("token", token);
      res.status(200).send("Login successful!!");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

app.get("/profile", async (req, res) => {
  try {
    const cookies = req.cookies;
    const { token } = cookies;

    //validate this token
    if (!token) {
      throw new Error("Invalid token");
    }

    const decodedMessage = await jwt.verify(token, "DEV@Community$1799");
    const { _id } = decodedMessage;

    //find the user inthe db by this id
    const user = await UserModel.findById(_id);
    if (!user) {
      throw new Error("Please login again");
    }

    res.status(200).send(user);
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

// app.post("/loginUser", async (req, res) => {
//   try {
//     const { emailId, password } = req.body;
//     const user = await UserModel.findOne({ emailId: emailId });
//     if (!user) {
//       throw new Error("Invalid Credentials");
//     }
//     const isPasswordCorrect = await bcrypt.compare(password, user.password);
//     if (isPasswordCorrect) {
//       res.status(200).send("Login successful");
//     } else {
//       throw new Error("Invalid Credentials");
//     }
//   } catch (err) {
//     res.status(400).send("ERROR: " + err.message);
//   }
// });

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
