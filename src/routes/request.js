const express = require("express");
const { userAuth } = require("../middleware/auth");
const requestRouter = express.Router();

requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
  const { user } = req;

  console.log("sending the connection request");
  res.send(user.firstName + " send the connection request");
});

module.exports = requestRouter;
