const express = require("express");

const { userAuth, adminAuth } = require("./middleware/auth");
const app = express();

app.use("/admin", adminAuth, (req, res) => {
  res.send("hello admin");
});

app.get("/user", userAuth, (req, res) => {
  res.send("hello User");
});

app.get("/user/getAllData", (req, res) => {
  res.send("hello user");
});

app.post("/user/login", (req, res) => {
  res.send("hello user");
});
// app.get("/abc", (req, res) => {
//   res.send("Hello World");
// });

// app.use(
//   "/user",
//   (req, res, next) => {
//     console.log("handling the route user");
//     next();
//   },
//   (req, res) => {
//     console.log("handling the route user 2");
//     res.send("Hello User2");
//   }
// );

//error handling code
//this is most suitable approach for handling errors
// another way to handle error
// app.use((err, req, res, next) => {
//   if (err) {
//     console.log("error handling middleware");
//     res.status(500).send(err.message);
//   }
// });

app.get("/getUserData", (req, res) => {
  try {
    throw new Error("something went wrong");
    res.send("hello user");
  } catch (err) {
    res.status(500).send(err.message);
  }
});
app.listen(3000, () => {
  console.log("node server is running on port 3000");
});
