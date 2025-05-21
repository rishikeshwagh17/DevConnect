const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      lowercase: true,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
    },
    photoUrl: {
      type: String,
    },
    about: {
      type: String,
      default: "Hey there! I am using this app.",
    },
  },
  { timestamps: true }
);

//create a model
const UserModel = mongoose.model("User", userSchema);
//export the model
module.exports = UserModel;
