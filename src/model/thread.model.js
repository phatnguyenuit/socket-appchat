const mongoose = require("mongoose");

const ThreadSchema = new mongoose.Schema({
  partners: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  messages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message'
  }],
  created_at: Date,
  updated_at: {
    type: Date,
    default: Date.now
  },
})

const Thread = mongoose.model('Thread', ThreadSchema);

module.exports = Thread;
