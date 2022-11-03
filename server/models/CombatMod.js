// Combat Mods can be present on Reward cards.
// They modify how combat works while in play.
// (Similar to enchantments/echantment auras in MTG)

const { Schema, model } = require('mongoose');

const CombatModSchema = new Schema( {

  name: {
    type: String,
    required: true,
    unique: true,
  },

  image: {
    type: Number,
    required: true,
  },

  color: {
    type: Number,
    required: true,
    default: 0,
  },

  description: {
    type: String,
    required: true,
  },

  effectId: {
    type: Integer,
    required: true,
  }

} );

const CombatMod = model('CombatMod', CombatModSchema);

module.exports = CombatMod;