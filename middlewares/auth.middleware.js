const jwt = require("jsonwebtoken");

// this function will be used to check if the user is authorized to access a protected resource
const requireAuth = (req, res, next) => {
  // get the token if it exists and is verified
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.status(401).json({ isLoggedIn: false, data: null });
        return;
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.status(401).json({ isLoggedIn: false, data: null });
    return;
  }
  next();
};

module.exports = { requireAuth };
