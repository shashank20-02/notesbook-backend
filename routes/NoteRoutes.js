const express = require("express");
const {
  CreateNote,
  ReadNote,
  UpdateNote,
  DeleteNote,
  GetAllNotes,
} = require("../controllers/NoteControllers");
const { isAuthincatedUser } = require("../middlewares/Auth");
const router = express.Router();

router.route("/create").post(isAuthincatedUser, CreateNote);
router.route("/read/:id").get(isAuthincatedUser, ReadNote);
router.route("/update/:id").put(isAuthincatedUser, UpdateNote);
router.route("/delete/:id").delete(isAuthincatedUser, DeleteNote);
router.route("/get").get(isAuthincatedUser, GetAllNotes);
module.exports = router;
