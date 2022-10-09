const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  remember: {
    type: Boolean,
    required: true,
    default: false,
  },
});

module.exports.hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt)
  } catch(error) {
    throw new Error('Hashing failed', error)
  }
}

const User = mongoose.model('user', userSchema);
module.exports = User;