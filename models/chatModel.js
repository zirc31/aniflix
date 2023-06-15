const mongoose = require('mongoose');
const moment = require('moment');

const chatMessageSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  sender: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now,
  }
});

chatMessageSchema.virtual('formattedTimestamp').get(function() {
  return moment(this.timestamp).format('YYYY-MM-DD HH:mm:ss');
});

const ChatMessage = mongoose.model('ChatMessage', chatMessageSchema);

module.exports = ChatMessage;