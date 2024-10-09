const mongoose = require("mongoose");

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

userSchema.statics.signup = async (email, password) =>{\
    try{
    const exists = await this.findOne({email})
        if (exists){
            throw Error('Email already in use')
        }
    }
    catch(error)
}

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
