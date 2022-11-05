const { Schema, model } = require('mongoose');
const Player = require('./Player');

const roundLogSchema = new Schema({
    player: [Player.schema],
    monsterDeck: [{
        type: Schema.Types.ObjectId,
        ref: 'Monster',
    }],
    rewardDeck: [{
        type: Schema.Types.ObjectId,
        ref: 'Reward',
    }],
    // Rewards in play this round
    reward: [ {
        type: Schema.Types.ObjectId,
        ref: 'Reward',
    } ],
});

const RoundLog = model('RoundLog', roundLogSchema);

module.exports = RoundLog;
