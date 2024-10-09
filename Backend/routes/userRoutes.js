const express = require("express");

/* createUser,
  getUser,
  updateUser,
  deleteUser, */
const {
  loginUser,
  signupUser,
  getAllUsers,
} = require("../controllers/userController");

const router = express.Router();

/* router.get("/:id", getUser);
router.post("/", createUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser); */
router.post("/login", loginUser);
router.post("/signup", signupUser);
router.get("/", getAllUsers);

module.exports = router;
