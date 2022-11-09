const db = require('../config/connection');
const { User, Monster, Reward, CombatMod, MonsterMod, GameSession } = require('../models');

const userData = require('./userData.json');
const monsterData = require('./monsterData.json');
const monsterModData = require('./monsterModData.json');
const rewardData = require('./rewardData.json');
const combatModData = require('./combatModData.json');
const gameSessionData = require('./gameSessionData.json');

db.once('open', async () => {
  // clean database
  await User.deleteMany({});
  await Monster.deleteMany({});
  await MonsterMod.deleteMany({});
  await Reward.deleteMany({});
  await CombatMod.deleteMany({});
  await GameSession.deleteMany({});

  try {
    await User.deleteMany({});
    await User.create(userData);

    console.log('all done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
