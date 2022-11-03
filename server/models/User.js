// User
//  --username
//  --password
//  --friends[]
//  --gameSessions[]
//  --avatar
//  --admin

const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
    },
    friends: [ {
        type: String,
        required: false,
    } ],
    gameSessions: [ {
        type: String,
        required: false,
    }],
    admin: {
        type: Boolean,
        required: true,
    }

});

const User = model('User', userSchema);

module.exports = User;
