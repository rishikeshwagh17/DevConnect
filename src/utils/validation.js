const validator = require("validator");

const validateSignupData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Name is not valid");
  } else if (firstName.length < 4 || firstName.length > 50) {
    throw new Error("First name should be between 4 and 50 characters");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("please enter a strong password");
  }
};

const validateEditProfileData = (req) => {
  const allowedEditFields = ["age", "gender", "photoUrl", "about"];

  const isEditAllowed = Object.keys(req.body).every((key) => {
    return allowedEditFields.includes(key);
  });
  return isEditAllowed;
};

module.exports = {
  validateSignupData,
  validateEditProfileData,
};
