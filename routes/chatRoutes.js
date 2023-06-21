const router = require('express').Router();
const Chat = require('../models/chatModel');

// GET http://localhost:8000/api/v1/chat/history
// GET request : { roomId: '' }
router.get( '/history', ( request, response ) => {
  // console.log(request.body);

  const thisRoomId = request.body.roomId;
  console.log(thisRoomId);

  Chat.find({ roomId: thisRoomId }).then( dbResponse => {
    if( dbResponse.length > 0 ) {
      console.log({ status: 200, message: `Chat history found!`, data: dbResponse });
      response.status( 200 ).send({ message: `Chat history found!`, data: dbResponse });
    } else {
      let responseMessage = `History not found for roomId: ${thisRoomId}!`;
      console.log({ status: 404, error: responseMessage });
      return response.status( 404 ).send( { error: responseMessage } );
    }
  });

});

// POST http://localhost:8000/api/v1/chat/add/message
// POST request : { roomId: '', chatData: {} }
router.post( '/add/message', ( request, response ) => {
  // console.log( request.body );
  const thisRoomId = request.body.roomId;
  const thisChatData = request.body.chatData;
  const toAdd = {
    chatData: thisChatData
  };
 
  // this will add chat message to the array.
  Chat.updateOne({ roomId: thisRoomId }, {$push: toAdd }).then( dbResponse => {
    // Chat.updateOne({ roomId: thisRoomId }, {$set: toUpdate }).then( dbResponse => {
    // console.log(dbResponse);
    // if modifiedCount > 0 means there are records that has been updated
    if( dbResponse.modifiedCount > 0 ) {
      console.log({ status: 200, message: `Chat successfully updated.`, data: dbResponse });
      response.status( 200 ).send({ message: `Chat successfully updated.`, data: dbResponse });
    } else {
      // else no existing chat, create new chat.
      const genRoomId = thisRoomId;
      let genChatData = {};
      if( thisChatData ) {
        genChatData = thisChatData;
      }
      const addNewChat = new Chat({
        roomId: genRoomId,
        chatData: [genChatData]
      });
      addNewChat.save().then( data => {
          let responseMessage = `Chat successfully created!`;
          console.log({ status: 201, message: responseMessage });
          response.status( 201 ).send({ message: responseMessage, data: data });
      });
    }
  });

});

// DELETE http://localhost:8000/api/v1/chat/delete/message
// DELETE request : { roomId: '' }
router.delete( '/delete/message', ( request, response ) => {

  const thisRoomId = request.body.roomId;

  Chat.updateOne({ roomId: thisRoomId }, { $pop: { chatData: -1 } }).then( dbResponse => {
    console.log({ status: 200, message: `Successfully removed old message.`, data: dbResponse });
    response.status( 200 ).send({ message: `Successfully removed old message.`, data: dbResponse });
  });

});

module.exports = router;