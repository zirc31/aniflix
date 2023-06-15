const express = require('express');
const router = express.Router();
const {v4: uuidv4 } = require('uuid');
const Room   = require('../models/RoomModel');
const bcrypt = require('bcrypt');


router.get('/:roomUID', (request, response) => {
    Room.findOne({ roomUID: request.params.roomUID })
    .then( dbResponse => {
        response.status( 200 ).send({ room: dbResponse.roomUID });
    });
})


router.post('/create', (request, response) => 
{
    const { roomid } = request.body;

    Room.findOne({ roomid, deleted: false })
    .then(dbResponse =>
        {
            if(dbResponse)
            {
                response.status( 400 ).send({ error: 'Room id is taken.' });
            }
            
            else
            {
                bcrypt.hash( request.body.password, 10 )
                .then((hash, err) =>
                {
                    const roomId = "id" + uuidv4();
                    const newRoom = new Room({roomid, roomUID:roomId, password: hash, deleted: false});
                    newRoom.save().then( data => 
                        {
                            console.log( data );
                            response.status( 201 ).send({  message: "Room created" });
                        });

                })
            }
        })
    

});


router.post('/join', (request, response) => {

    Room.findOne({ roomid: request.body.roomid }).then( dbResponse => {

            bcrypt.compare( request.body.password, dbResponse.password )
            .then( isValid => {
                if( !isValid ){
                    response.status( 404 ).send({ error: 'Invalid credentials' });
                } else {
                    response.status( 200 ).send({ message: "Login success!", roomUID: dbResponse.roomUID  });
                }
            });
        });
})

router.delete('/delete/:roomid', (request, response) =>
{
    const roomId = request.params.roomid;

    Room.findByIdAndUpdate(roomId,  { deleted: true }, { new: true }) 
    .then(deleteRoom =>
        {
            if(!deleteRoom)
            {
                return response.status(400).send({error: "roomnot found"});
            }
            response.status(200).send({ message: 'room deleted successfully' });
 
        })
    .catch(error =>
        {
            response.status(400).send({error: 'failed to delete room'});
        });
});




module.exports = router;
