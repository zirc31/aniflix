const mongoose = require('mongoose');

const RoomSchema  = mongoose.Schema({
    roomid: String,
    roomUID: String,
    password: String,
    animeid: String, // added by zirc.
    episodeid: String, // added by zirc.
    deleted: { type: Boolean, default: false },
});

module.exports = mongoose.model("Room", RoomSchema);
