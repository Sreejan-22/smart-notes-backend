const { Router } = require("express");
const { signup, login } = require("../controllers/authController");

// creating a new instance of the Router
const router = Router();

router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
