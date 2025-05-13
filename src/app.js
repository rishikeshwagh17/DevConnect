const express = require("express");

const app = express();

app.get("/user", (req, res) => {
  res.send({ firstname: "John", lastname: "Doe" });
});

app.post("/user", (req, res) => {
  console.log("update the DB and return the user");
  res.send("post api is done");
});

app.put("/updateUser", (req, res) => {
  res.send("put api is done");
});

app.delete("/deleteUser", (req, res) => {
  console.log("user deleted successfully");
  res.send("delete api is done");
});
//handle the code for request
app.use("/hello", (req, res) => {
  res.send("Hello from the server");
});

app.listen(3000, () => {
  console.log("node server is running on port 3000");
});
