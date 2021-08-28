const mongoose = require("mongoose");
const { Schema } = require("mongoose");

// const noteDataSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   details: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   noteType: {
//     type: String,
//     required: true,
//   },
// });

const noteSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  notes: [
    {
      title: {
        type: String,
        required: true,
        trim: true,
      },
      details: {
        type: String,
        required: true,
        trim: true,
      },
      noteType: {
        type: String,
        required: true,
      },
    },
  ],
});

const Notes = mongoose.model("note", noteSchema);
module.exports = Notes;
