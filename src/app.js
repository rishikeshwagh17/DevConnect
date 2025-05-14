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
app.listen(3000, () => {
  console.log("node server is running on port 3000");
});
