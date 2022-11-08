const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

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
        minlength: 6,
    },
    friends: [ {
        type: Schema.Types.ObjectId,
        ref: 'User',
    } ],
    friendInvites: [ {
        type: String,
    } ],
    sentFriendInvites: [ {
        type: String,
    } ],
    gameSessions: [ {
        type: Schema.Types.ObjectId,
        ref: 'GameSession',
    } ],
    gameInvites: [ {
        type: String,
    } ],
    sentGameInvites: [ {
        type: String,
    } ],
    avatar: {
        type: String,
    },
    admin: {
        type: Boolean,
        required: true,
        default: false,
    },
    loggedIn: {
        type: Boolean,
        required: true,
        default: false,
    },

});

userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  
    next();
  });

userSchema.methods.isCorrectPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

const User = model('User', userSchema);

module.exports = User;
