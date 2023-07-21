const Async = require("../middlewares/Async");
const Note = require("../models/NoteModel");
const ErrorHandler = require("../utils/ErrorHandler");

exports.CreateNote = Async(async (req, res, next) => {
  const { title, desc, tags } = req.body;
  const note = await Note.create({
    title,
    desc,
    tags,
    user: {
      id: req.user.id,
    },
  });

  res.status(201).json({
    success: true,
    note,
  });
});

exports.ReadNote = Async(async (req, res, next) => {
  const { id } = req.params;
  const note = await Note.findById(id);
  if (!note) {
    return next(new ErrorHandler("Note Doesn't Exists", 400));
  }

  res.status(200).json({
    success: true,
    note,
  });
});

exports.UpdateNote = Async(async (req, res, next) => {
  const { id } = req.params;
  let note = await Note.findById(id);
  if (!note) {
    return next(new ErrorHandler("Note Doesn't Exists", 400));
  }

  if (note.user.id.valueOf() !== req.user.id) {
    return next(new ErrorHandler("User not Authorized", 400));
  }
  note = await Note.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    note,
  });
});

exports.DeleteNote = Async(async (req, res, next) => {
  const { id } = req.params;
  let note = await Note.findById(id);
  if (!note) {
    return next(new ErrorHandler("Note Doesn't Exists", 400));
  }

  if (note.user.id.valueOf() !== req.user.id) {
    return next(new ErrorHandler("User not Authorized", 400));
  }

  note = await Note.findByIdAndDelete(id);

  res.status(200).json({
    success: true,
    message: "Note Deleted Successfully",
  });
});

exports.GetAllNotes = Async(async (req, res, next) => {
  const notes = await Note.find({ "user.id": req.user.id });
  res.status(200).json({
    success: true,
    notes,
  });
});
