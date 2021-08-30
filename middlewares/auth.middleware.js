const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const jwt_secret = process.env.JWT_SECRET;

// this function will be used to check if the user is authorized to access a protected resource
const requireAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];
    const decodedToken = jwt.verify(token, jwt_secret);
    const userId = decodedToken.id;
    const user = await User.findById(userId);

    if (!user) {
      res
        .status(401)
        .json({
          status: "error",
          isLoggedIn: false,
          message: "Unauthorized access",
        });
      return;
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({
      status: "error",
      isLoggedIn: false,
      message: "Unauthorized access",
    });
    return;
  }
};

module.exports = { requireAuth };
