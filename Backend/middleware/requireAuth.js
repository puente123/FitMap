const jwt = require("jsonwebtoken");
const User = require("../models/userModel")

const requireAuth = async (req, res, next) => {
  //Verify authentication
  console.log(req)
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token requried" });
  }

  const token = authorization.split(" ")[1];
  //splitString = "".join(string.split())

  try {
    const { _id } = jwt.verify(token, process.env.SECRET_KEY);
    req.user = await User.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: error.message });
  }
};

module.exports = requireAuth