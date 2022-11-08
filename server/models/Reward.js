const { Schema, model } = require('mongoose');

const RewardSchema = new Schema( {

  name: {
    type: String,
    required: true,
  },

  gold: {
    type: String,
    required: true,
    default: 1,
  },

  mods: [ {
    type: Schema.Types.ObjectId,
    ref: 'CombatMod',
  } ],

  image: {
    type: String,
    required: true,
    default: 0,
  },

  background: {
    type: String,
    required: true,
    default: 0,
  },

  color: {
    type: String,
    required: true,
    default: 0,
  },

  texture: {
    type: String,
    required: true,
    default: 0,
  },

} );

const Reward = model('Reward', RewardSchema);

module.exports = Reward;