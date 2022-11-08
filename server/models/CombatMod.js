// Combat Mods can be present on Reward cards.
// They modify how combat works while in play.
// (Similar to enchantments/echantment auras in MTG)

const { Schema, model } = require('mongoose');

const combatModSchema = new Schema( {

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

const CombatMod = model('CombatMod', combatModSchema);

module.exports = CombatMod;