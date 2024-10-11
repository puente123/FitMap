const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Use "async function" instead of '=>' becuase we are using "this."
userSchema.statics.signup = async function (email, password) {
  if (!email || !password) {
    throw Error("All input fields must be filled");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email is not a valid email");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong enough");
  }

  try {
    const exists = await this.findOne({ email });
    if (exists) {
      throw Error("Email already in use");
    }
    //salt extentions is added on to pasword
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({ email, password: hash });
    return user;
  } catch (error) {
    throw error;
  }
};

//Static Login Method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All input fields must be filled");
  }

  try {
    const user = await this.findOne({ email });
    if (!user) {
      throw Error("user not found: Incorrect Email");
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw Error("Incorrect password");
    }

    return user;
  } catch (error) {
    throw error;
  }
};

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
