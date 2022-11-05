const { Schema, model } = require('mongoose');


const chatLogSchema = new Schema({
    from: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    text: {
        type: String,
    }
});

const ChatLog = model('ChatLog', chatLogSchema);

module.exports = ChatLog;
