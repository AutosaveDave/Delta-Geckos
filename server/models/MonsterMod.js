// Monster Mods can be present on Monster cards.
// They modify how combat works for the Monster.
// (Similar to traits like "flying" or "first strike" in MTG)

const { Schema, model } = require('mongoose');

const MonsterModSchema = new Schema( {

  name: {
    type: String,
    required: true,
    unique: true,
  },

  image: {
    type: String,
    required: true,
  },

  color: {
    type: String,
    required: true,
    default: 0,
  },

  description: {
    type: String,
    required: true,
  },

  effectId: {
    type: String,
    required: true,
  }

} );

const MonsterMod = model('MonsterMod', MonsterModSchema);

module.exports = MonsterMod;