const mongoose = require("mongoose");
const bcrypt = require('bcrypt')

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
    throw error
  }
};

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
