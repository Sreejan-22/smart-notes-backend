module.exports.signup = (req, res) => {
  const { email, password } = req.body;
  console.log("Signup: " + email, password);
  res.send("new signup");
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  console.log("Login: " + email, password);
  res.send("new login");
};
