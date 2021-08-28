require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");
const { requireAuth } = require("./middlewares/auth.middleware");
const Notes = require("./models/note.model");

/*
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
*/
const app = express();
const port = 3000;

// middleware
app.use(express.json()); // takes any json data that comes along with the request and parses the data into javascript objects so that we can access from the request body itself

// app.use(express.urlencoded());
// app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:4000",
  })
);

const dbName = "smart-notes";
const dbURI = `mongodb+srv://smartAdmin:${process.env.MONGODB_PASSWORD}@cluster0.ozfi3.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((result) => {
    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  })
  .catch((err) => console.log(err));

// routes
app.post("/notes", requireAuth, async (req, res) => {
  // const user = req.user;
  // // console.log(user);
  // res.status(200).json({ isLoggedIn: true, data: {} });
  try {
    const { title, details, type } = req.body;
    const email = req.user.email;

    // create a new note
    const allNotes = await Notes.findOne({
      email,
    });
    if (allNotes) {
      const notes = [...allNotes.notes];
      notes.push({ title, details, noteType: type });
      allNotes.notes = notes;
      await allNotes.save();
      res
        .status(201)
        .json({ status: "ok", message: "new note created", notes: allNotes });
    } else {
      const noteData = {
        email,
        notes: [
          {
            title,
            details,
            noteType: type,
          },
        ],
      };
      const newNote = await Notes.create(noteData);
      res
        .status(201)
        .json({ status: "ok", message: "new note created", note: newNote });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "error",
      message: "failed to create a new note",
      errorMessage: err,
    });
  }
});

app.get("/notes", requireAuth, async (req, res) => {
  // const user = req.user;
  try {
    const notes = await Notes.findOne({ email: req.user.email });
    res.status(200).json({ isLoggedIn: true, notes });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "error",
      message: "failed to fetch notes",
      errorMessage: err,
    });
  }
});

app.use(authRoutes);
