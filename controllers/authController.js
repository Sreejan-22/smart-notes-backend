const User = require("../models/User");
const bcrypt = require("bcrypt");

const handleError = (err) => {
  // there can be 2 types of error:
  // one: invalid user input e.g. mandatory field blank, email format invalid, etc
  // second: duplicate input - when a user enters an already used email
  // console.log("Error message: " + err.message);
  // console.log("Error code: ", err.code);
  // err.code is for errors related to "unique: true" property of email field of the User schema
  // its mostly undefined for other kinds of errors

  const clientError = { email: "", password: "" };
  // this error object is to be sent to the frontend
  // the email peoperty gets populated if an error occurs in the email fields and same for password

  // input parameter "err" is an object which contains 2 properties - email and password
  // if there's no error in any of these 2 fields it won't be present in the "err" object

  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach((item) => {
      clientError[item.properties.path] = item.properties.message;
    });
  }

  // errors due to duplicate
  if (err.code == 11000) {
    clientError.email = "This email has already been taken";
  }

  return clientError;
};

module.exports.signup = async (req, res) => {
  const { email, password } = req.body;

  try {
    // hash the password using bcrypt
    const saltRounds = 10;
    // const salt = await bcrypt.genSalt(saltRounds);
    // auto-gen a salt and hash
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = await User.create({ email, password: hashedPassword });
    res.status(201).json(user);
  } catch (err) {
    // send the error as response and test it in postman to observe the error object; identify the required fields
    const errors = handleError(err);
    if (errors.email === "" && errors.password === "") {
      res.status(500).send("internal server error");
    } else {
      res.status(400).json({ errors });
    }
  }
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  console.log("Login: " + email, password);
  res.send("new login");
};
