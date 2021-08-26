const jwt = require("jsonwebtoken");

// this function will be used to check if the user is authorized to access a protected resource
const requireAuth = (req, res, next) => {
  // get the token if it exists and is verified
  const token = req.cookies.jwt;
  console.log(token);
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.status(401).send("Unauthorized Route! Redirect to Login");
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.status(401).send("Unauthorized Route! Redirect to Login");
  }
  next();
};

module.exports = { requireAuth };
