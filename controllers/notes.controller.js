const Notes = require("../models/note.model");

module.exports.getNotes = async (req, res) => {
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
};

module.exports.createNote = async (req, res) => {
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
        .json({ status: "ok", message: "new note created", notes: newNote });
    }
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: "failed to create a new note",
      errorMessage: err,
    });
  }
};

module.exports.deleteNote = async (req, res) => {
  try {
    const index = req.params.index;
    const email = req.user.email;
    const allNotes = await Notes.findOne({ email });
    const notes = [...allNotes.notes];
    notes.splice(index, 1);
    allNotes.notes = notes;
    await allNotes.save();
    res
      .status(200)
      .json({ status: "ok", message: "note deleted!!", newNotes: allNotes });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "error",
      message: "failed to delete the note",
      errorMessage: err,
    });
  }
};

module.exports.updateNote = async (req, res) => {
  try {
    const { title, details, type } = req.body;
    const index = req.params.index;
    const email = req.user.email;
    const updatedData = {
      title,
      details,
      noteType: type,
    };
    const allNotes = await Notes.findOne({ email });
    allNotes.notes[index] = updatedData;

    await allNotes.save();
    res.status(200).json({
      status: "ok",
      message: "note updated!!",
      updatedNote: allNotes.notes[index],
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "error",
      message: "failed to update the note",
      errorMessage: err,
    });
  }
};
