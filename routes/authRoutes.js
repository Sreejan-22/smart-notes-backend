const { Router } = require("express");
const { signup, login, logout } = require("../controllers/auth.controller");

// creating a new instance of the Router
const router = Router();

router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
