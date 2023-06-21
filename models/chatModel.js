const mongoose = require('mongoose');

const ChatSchema = mongoose.Schema({
    roomId: String,
    chatData: [{
      roomId: String,
      sender: String,
      avatar: String,
      message: String,
      time: String
    }],
});

module.exports = mongoose.model( 'Chat', ChatSchema );
// collection name : chats, model name: Chat