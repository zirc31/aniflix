const router = require('express').Router()

// chatModel.js
const Chat = require('../models/chatModel.js');

// Route to create a new chat message
router.post('/messages', (request, response) => {
  const { text, sender } = request.body;

  const newMessage = new Chat({
    text,
    sender
  });

  newMessage.save()
    .then((message) => {
      response.status(200).json(message);
    })
    .catch((err) => {
      console.error('Failed to save chat message:', err);
      response.status(500).json({ error: 'Failed to save chat message' });
    });
});

// Route to retrieve all chat messages
router.get('/messages', (request, response) => {
  ChatMessage.find()
    .then((messages) => {
      const formattedMessages = messages.map((message) => ({
        text: message.text,
        sender: message.sender,
        timestamp: message.formattedTimestamp
      }));
      response.status(200).json(formattedMessages);
    })
    .catch((err) => {
      console.error('Error retrieving chat messages:', err);
      response.status(500).json({ error: 'Failed to retrieve chat messages' });
    });
});

module.exports = router