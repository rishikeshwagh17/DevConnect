const express = require("express");
const bcrypt = require("bcrypt");
const UserModel = require("../models/user");
const { validateSignupData } = require("../utils/validation");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
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

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await UserModel.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      //JWT token generation

      const token = await user.getJwtToken(); //using schema merhods

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

module.exports = authRouter;
