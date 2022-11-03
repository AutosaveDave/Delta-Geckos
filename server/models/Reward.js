const { Schema, model } = require('mongoose');

const RewardSchema = new Schema( {

  name: {
    type: String,
    required: true,
  },

  gold: {
    type: Number,
    required: true,
    default: 1,
  },

  mods: [ {
    type: Schema.Types.ObjectId,
    ref: 'CombatMod',
  } ],

  image: {
    type: Number,
    required: true,
    default: 0,
  },

  background: {
    type: Number,
    required: true,
    default: 0,
  },

  color: {
    type: Number,
    required: true,
    default: 0,
  },

  texture: {
    type: Number,
    required: true,
    default: 0,
  },

} );

const Reward = model('Reward', RewardSchema);

module.exports = Reward;