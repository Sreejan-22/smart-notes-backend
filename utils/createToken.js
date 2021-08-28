const jwt = require("jsonwebtoken");

const createToken = (id) => {
  const payload = {
    id,
  };
  const secret = process.env.JWT_SECRET;
  const options = {
    expiresIn: "24h",
  };
  // headers are auto generated
  const token = jwt.sign(payload, secret, options);
  return token;
};

module.exports = {
  createToken,
};
