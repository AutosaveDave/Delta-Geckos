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

  chatLog: [ {
    from: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    text: {
        type: String,
    }
  } ],

  // A record of each round
  roundLog: [ {

    player: [ {
        pid: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        hand: [ {
            type: Schema.Types.ObjectId,
            ref: 'Monster',
        } ],
        played: {
            type: Schema.Types.ObjectId,
            ref: 'Monster',
        },
        survived: {
            type: Boolean,
        },
        won: {
            type: Boolean,
        },

    }],
    // Rewards in play
    reward: [ {
        type: Schema.Types.ObjectId,
        ref: 'Reward',
    } ],
    played: [ {
        type: Schema.Types.ObjectId,
        ref: 'Monster',
    } ],
    survived: [ {
        type: Boolean,
    } ],
    won: {
        type: Schema.Types.ObjectId,
    }
  } ],

  ongoing: {
    type: Boolean,
    default: true,
  },

} );

const GameSession = model('GameSession', gameSessionSchema);

module.exports = GameSession;
