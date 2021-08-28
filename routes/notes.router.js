const { Router } = require("express");
const { getNotes, createNote } = require("../controllers/notes.controller");
const { requireAuth } = require("../middlewares/auth.middleware");

// creating a new instance of the Router
const router = Router();

router.get("/notes", requireAuth, getNotes);
router.post("/notes", requireAuth, createNote);

module.exports = router;
