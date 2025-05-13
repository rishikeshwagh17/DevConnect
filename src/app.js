const express = require("express");

const app = express();

//handle the code for request
app.use("/hello", (req, res) => {
  res.send("Hello from the server");
});

app.listen(3000, () => {
  console.log("node server is running on port 3000");
});
