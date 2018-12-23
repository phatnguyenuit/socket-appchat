const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    lowercase: true,
    // unique: true
  },
  email: {
    type: String,
    lowercase: true,
    // unique: true
  },
  password_hash: String,
  is_active: {
    type: Boolean,
    default: false
  },
})

const User = mongoose.model('User', UserSchema);

module.exports = User;
