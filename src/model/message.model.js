const mongoose = require("mongoose");
const MessageSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  message_body: String,
  message_status: {
    type: Boolean,
    default: false
  },
  created_at: {
    type: Date,
    default: Date.now
  },
})

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;
