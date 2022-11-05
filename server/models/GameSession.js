const { Schema, model } = require('mongoose');
const Player = require('./Player');
const ChatLog = require('./ChatLog');
const RoundLog = require('./RoundLog');

const gameSessionSchema = new Schema( {

  player: [Player.schema],

  // The deck of monster cards
  deck: [ {
    type: Schema.Types.ObjectId,
    ref: 'Monster',
  } ],

  // The deck of reward cards
  rewardsDeck: [ {
    type: Schema.Types.ObjectId,
    ref: 'Reward',
  } ],

  // Rewards currently in play
  rewardsInPlay: [ {
    type: Schema.Types.ObjectId,
    ref: 'Reward',
  } ],

  // Chat messages
  chatLog: [ChatLog.schema],

  // A record of each round
  roundLog: [RoundLog.schema],

  // Whether the game is still in progress
  ongoing: {
    type: Boolean,
    default: true,
  },

} );

const GameSession = model('GameSession', gameSessionSchema);

module.exports = GameSession;
