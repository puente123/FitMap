const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
//require("dotenv").config();
const SECRET_KEY = process.env.SECRET_KEY;

const createToken = (_id) => {
  //Creates JSON web token
  return jwt.sign({ _id }, SECRET_KEY, { expiresIn: "3d" });
};

const loginUser = async (req, res) => {
  res.json({ mssg: "login user" });
};

const signupUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const users = await User.signup(email, password);

    const token = createToken(users._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message + "this" });
  }
};

const createUser = async (req, res) => {
  const { username, password, email } = req.body;

  newUser = {
    username: username,
    password: password,
    email: email,
  };
  try {
    await User.create(newUser);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    //const response = await User.findByIdAndDelete(req.pararms._id);
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
};

const updateUser = async (req, res) => {
  const { username, password, email } = req.body;
  const updatedUserData = {
    username: username,
    password: password,
    email: email,
  };
  const { id } = req.params;

  try {
    const currentUser = await User.findByIdAndUpdate(id, updatedUseData);
    res.status(201).json(currentUser);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: `User not found ${username}` });
    }

    if ((user.password = password)) {
      res.status(201).json(user);
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find({});
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createUser,
  deleteUser,
  updateUser,
  getUser,
  loginUser,
  signupUser,
  getAllUsers,
};
