const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");
const userAuth = async (req, res, next) => {
  //read the token from the request cookies
  //validate the token
  //Find the User
  try {
    const cookies = req.cookies;
    const { token } = cookies;

    if (!token) {
      throw new Error("Token is not valid!!");
    }
    const decodedObject = await jwt.verify(token, "DEV@Community$1799");
    const { _id } = decodedObject;

    const user = await UserModel.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
};

module.exports = {
  userAuth,
};
