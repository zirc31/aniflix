const mongoose = require('mongoose');

const RoomSchema  = mongoose.Schema({
    roomid: String,
    roomUID: String,
    password:   String,
    deleted: { type: Boolean, default: false },
});

module.exports = mongoose.model("Room", RoomSchema);
