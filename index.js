require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');

const http = require('http');
const { Server } = require('socket.io');

const MongoDbUser = process.env.MONGODB_USER;
const MongoDbPass = process.env.MONGODB_PASS;
const MongoDbCluster = process.env.MONGODB_CLUSTER;
const MongoDbDatabase = process.env.MONGODB_DATABASE;

const PORT = process.env.APP_PORT;
const ioPORT = process.env.APP_PORT_IO;
const BaseURL = `/api/v1`;

const app = express();
const ioServer = express();

// setup server using socket.io
ioServer.use(cors());
const server = http.createServer(ioServer);
const io = new Server( server, {
    cors:{
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
    // cors:{
    //     origin:"*"
    // }
});

// make sure that socket.io is connected.
// listen to "connection" events
io.on('connection', (socket) => {
    console.log(`User connected with Socket Id: ${socket.id}`);

    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room: ${data}.`);
    });

    // listen to the event called "send_message"
    socket.on("send_message", (data) => {
        console.log(data);
        // when a user send a message, socket will received the user information including the message.
        // then send it to another event which is receive_message
        // and send to to everyone in the roomId
        socket.to(data.roomId).emit("receive_message", data)
    });

    // if the browser being used by the user disconnected.
    socket.on('disconnect', (data) => {
        console.log( `User disconnected: `, socket.id );
    });

});

// Database
const mongoose = require('mongoose');
// mongoose.connect(`mongodb+srv://${MongoDbUser}:${MongoDbPass}@${MongoDbCluster}/${MongoDbDatabase}`);
mongoose.connect(`mongodb://127.0.0.1:27017/${MongoDbDatabase}`);

// Routes
const UserRoutes = require('./routes/UserRoutes');
const RoomRoutes = require('./routes/RoomRoutes');
const AniflixRoutes = require('./routes/AniflixRoutes');

app.use( cors() );
app.use( bodyParser.json() );
app.use( morgan('dev') );
app.use( helmet() );

// Middlewares
// will add middlewares here.

// GET: http://localhost:8000
app.get('/', ( request, response ) => {
    let responseMessage = `Aniflix App | Back-end`;
    console.log({ status: 200, message: responseMessage });
    response.status( 200 ).send({ message: responseMessage });
});

// To Routes Endpoints
app.use( `${BaseURL}/user`, UserRoutes );
app.use( `${BaseURL}/room`, RoomRoutes );
app.use( `${BaseURL}/fetch`, AniflixRoutes );

app.listen( PORT, () => { console.log(`App Server running on port ${PORT}.`) } );
server.listen( ioPORT, () => console.log( `Socket Server listening on port ${ioPORT}` ));