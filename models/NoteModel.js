const mongoose = require("mongoose");

const NoteModel = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter the title of the Note"],
    MaxLength: [100, "Title should not exceed 100 letters"],
  },
  desc: {
    type: String,
    required: [true, "Please enter the description of the Note"],
    MinLength: [40, "Description should be at least 40 letters"],
  },
  tags: [{ type: String }],
  user: {
    id: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
  },
});

const Notes = mongoose.model("notes", NoteModel);
module.exports = Notes;
