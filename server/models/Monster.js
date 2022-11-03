const { Schema, model } = require('mongoose');

const MonsterSchema = new Schema( {

  name: {
    type: String,
    required: true,
    unique: true,
  },

  flavorText: {
    type: String,
  },

  attack: {
    type: Number,
    required: true,
  },

  defense: {
    type: Number,
    required: true,
  },

  mods: [ {
    type: Schema.Types.ObjectId,
    ref: 'MonsterMod',
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

const Monster = model('Monster', MonsterSchema);

module.exports = Monster;