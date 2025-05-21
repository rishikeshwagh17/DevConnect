const mongoose = require("mongoose");
const validator = require("validator");

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
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid");
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Password is not strong enough");
        }
      },
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
    },
    photoUrl: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-978409_960_720.png",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("URL is invalid");
        }
      },
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
