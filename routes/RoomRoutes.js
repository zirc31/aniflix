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
    // const { roomid } = request.body;
    // These are renee's codes
    // Room.findOne({ roomid, deleted: false })
    // .then(dbResponse =>
    //     {
    //         if(dbResponse)
    //         {
    //             response.status( 400 ).send({ error: 'Room id is taken.' });
    //         }
    //         else
    //         {
    //             bcrypt.hash( request.body.password, 10 )
    //             .then((hash, err) =>
    //             {
    //                 const roomId = "id" + uuidv4();
    //                 const newRoom = new Room({roomid, roomUID:roomId, password: hash, deleted: false});
    //                 newRoom.save().then( data => 
    //                     {
    //                         console.log( data );
    //                         response.status( 201 ).send({  message: "Room created" });
    //                     });
    //             })
    //         }
    //     })

    // modified by zirc.
    const roomid = request.body.roomid;
    const animeid = request.body.animeid;
    const episodeid = request.body.episodeid;
    Room.findOne({ roomid: roomid, deleted: false }).then( dbResponse => {
        // if Room not exist
        if( !dbResponse ) {
            bcrypt.hash( request.body.password, 10 )
            .then((hash, err) =>
            {
                if( err ) {
                    console.error(err);
                }
                const roomId = "id" + uuidv4();
                const newRoom = new Room({roomid, roomUID:roomId, password: hash, animeid: animeid, episodeid: episodeid, deleted: false});
                newRoom.save().then( data => {
                    console.log({ status: 201, message: `You have successfully created a Room!`, roomUID: roomId });
                    return response.status( 201 ).send({
                        message: `You have successfully created a Room!`,
                        roomUID: roomId,
                        animeid: animeid,
                        episodeid: episodeid
                    });
                });
            });
        } else {
        // else Room exist
            console.log({ status: 400, error: `Create room failed, Room id is taken!` });
            return response.status( 400 ).send( { error: `Create room failed, Room id is taken!` } );
        }
    });

});


router.post('/join', (request, response) => {

    Room.findOne({ roomid: request.body.roomid }).then( dbResponse => {
        // if Room not exist
        if( !dbResponse ) {
            console.log({ status: 404, error: `Room not found!` });
            return response.status( 404 ).send( { error: `Room not found!` } );
        } else {
        // else Room exist
            // check for password
            bcrypt.compare( request.body.password, dbResponse.password ).then( isValid => {
                if( !isValid ){
                    console.log({ status: 404, error: `Invalid credentials!` });
                    return response.status( 404 ).send({ error: `Invalid credentials!` });
                }else{
                    console.log({ status: 200, message: 'You have joined the room successfully!', roomUID: dbResponse.roomUID });
                    return response.status( 200 ).send({
                        message: 'You have joined the room successfully!',
                        roomUID: dbResponse.roomUID,
                        animeid: dbResponse.animeid,
                        episodeid: dbResponse.episodeid
                    });
                }
            });
        }
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
