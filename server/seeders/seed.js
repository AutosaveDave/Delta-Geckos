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

  // bulk create each model
  // const users = await User.insertMany(userData);
  // const monsters = await Monster.insertMany(monsterData);
  // const monsterMods = await MonsterMods.insertMany(monsterModData);
  // const rewards = await Reward.insertMany(rewardData);
  // const combatMods = await CombatMod.insertMany(combatModData);
  // const gameSessions = await GameSession.insertMany(gameSessionData);

//   for (newClass of classes) {
//     // randomly add each class to a school
//     const tempSchool = schools[Math.floor(Math.random() * schools.length)];
//     tempSchool.classes.push(newClass._id);
//     await tempSchool.save();

//     // randomly add a professor to each class
//     const tempProfessor = professors[Math.floor(Math.random() * professors.length)];
//     newClass.professor = tempProfessor._id;
//     await newClass.save();

//     // reference class on professor model, too
//     tempProfessor.classes.push(newClass._id);
//     await tempProfessor.save();
//   }

  console.log('all done!');
  process.exit(0);
});
