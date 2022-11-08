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
    type: String,
    required: true,
  },

  defense: {
    type: String,
    required: true,
  },

  mods: [ {
    type: Schema.Types.ObjectId,
    ref: 'MonsterMod',
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

const Monster = model('Monster', MonsterSchema);

module.exports = Monster;