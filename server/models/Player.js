const { Schema, model } = require('mongoose');

const playerSchema = new Schema({

    // Player ID
    pid: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    // Rewards held by player at start of round
    rewards: [ {
        type: Schema.Types.ObjectId,
        ref: 'Reward',
    } ],

    // Monsters held by player. Card played this
    // round does not appear here.
    hand: [ {
        type: Schema.Types.ObjectId,
        ref: 'Monster',
    } ],

    // Card played by player this round
    // If null, player has not selected a card
    played: [ {
        type: Schema.Types.ObjectId,
        ref: 'Monster',
    } ],

    // Player's discard pile at start of round
    discarded: [ {
        type: Schema.Types.ObjectId,
        ref: 'Monster',
    } ],

    // Whether the player's monster survived round
    survived: {
        type: Boolean,
    },

    // Whether the player's monster
    // defeated opponent's monster
    won: {
        type: Boolean,
    },

});

const Player = model('Player', playerSchema);

module.exports = Player;
