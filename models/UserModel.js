const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    userId: String, // id UID- + uuid generated id.
    tokenId: String, // use the tokenId to create a token in jwt.
    searchId: String,
    email: String,
    username: String,
    password: String,
    firstName: String,
    middleName: String,
    lastName: String,
    avatarImageUrl: String,
    bgImageUrl: String,
    role: String,
    status: String // active, inactive(considered as soft delete)
});

module.exports = mongoose.model( 'User', UserSchema );
// collection name : users, model name: User