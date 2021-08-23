const User = require("../models/User");

module.exports.signup = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
    res.status(400).send("error: user not created");
  }
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  console.log("Login: " + email, password);
  res.send("new login");
};
