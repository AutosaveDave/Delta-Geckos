const { Schema, model } = require('mongoose');

const gameSessionSchema = new Schema( {

  player: [ {

    pid: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    rewards: [ {
        type: Schema.Types.ObjectId,
        ref: 'Reward',
    } ],

    hand: [ {
        type: Schema.Types.ObjectId,
        ref: 'Monster',
    } ],

    played: [ {
        type: Schema.Types.ObjectId,
        ref: 'Monster',
    } ],

    discarded: [ {
        type: Schema.Types.ObjectId,
        ref: 'Monster',
    } ],

  } ],

  deck: [ {
    type: Schema.Types.ObjectId,
    ref: 'Monster',
  } ],

  rewardsDeck: [ {
    type: Schema.Types.ObjectId,
    ref: 'Reward',
  } ],

  rewardsInPlay: [ {
    type: Schema.Types.ObjectId,
    ref: 'Reward',
  } ],

  chat: [ {
    from: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    text: {
        type: String,
    }
  } ],

  ongoing: {
    type: Boolean,
    default: true,
  },

} );

const GameSession = model('GameSession', gameSessionSchema);

module.exports = GameSession;
