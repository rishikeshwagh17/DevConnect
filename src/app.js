const express = require("express");
const connectDB = require("./config/database");
const { userAuth } = require("./middleware/auth");
const UserModel = require("./models/user");
const cookieParser = require("cookie-parser");

//import the routes

const app = express();
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

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
