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
    default: "default",
  },

  background: {
    type: String,
    default: "default",
  },

  color: {
    type: String,
    default: "default",
  },

  texture: {
    type: String,
    default: "default",
  },

} );

const Monster = model('Monster', MonsterSchema);

module.exports = Monster;