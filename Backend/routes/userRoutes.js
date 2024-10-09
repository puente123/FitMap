const express = require("express");

const {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  loginUser,
  signupUser
} = require("../controllers/workoutController");

const router = express.Router();

/* router.get("/:id", getUser);
router.post("/", createUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser); */
router.post('/login', loginUser);
router.post('/signup', signupUser)

module.exports = router;
