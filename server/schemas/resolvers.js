const { User, Monster, Reward, GameSession, MonsterMod, CombatMod } = require('../models');

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },

    userByName: async (parent, { findUsername } ) => {
      return User.findOne( { username: findUsername } );
    },

    userById: async (parent, { findUserId } ) => {
      return User.findOne( { _id: findUserId } );
    },

    gamesOngoing: async () => {
      return GameSession.find( { ongoing: true } );
    },

    gamesByUserId: async (parent, { findUserId } ) => {
      return GameSession.find(  { "player.pid" : findUserId } );
    },

    monsters: async () => {
      return Monster.find();
    },

    monsterById: async (parent, { findMonsterId } ) => {
      return Monster.findOne( { _id: findMonsterId } );
    },

    rewards: async() => {
      return Reward.find();
    },

    rewardById: async (parent, { findRewardId } ) => {
      return Reward.findOne( { _id: findRewardId } );
    },

    monsterMods: async () => {
      return MonsterMod.find();
    },

    monsterModById: async(parent, { findMonsterModId } ) => {
      return MonsterMod.findOne( { _id: findMonsterModId } );
    },

    combatMods: async () => {
      return CombatMod.find();
    },

    combatModById: async(parent, { findCombatModId } ) => {
      return CombatMod.findOne( { _id: findCombatModId } );
    },
    
    playerView: async(parent, { gameId, playerId }, context ) => {
      const playerInfo = await GameSession.findById( { gameId } ).player.findOne( { pid: playerId } );
      const opponentInfo = await GameSession.findById( { gameId } ).player.findOne( { pid: { $ne:playerId } } ).select("pid rewards played discarded");
      const arenaInfo = await GameSession.findById( { gameId } ).select("rewardsInPlay chatLog roundLog ongoing")
        // opponentPlayed: Boolean
        // rewardsInPlay: [ID]
        // opponentRewards: [ID]
    }
  },

  Mutation: {
    
  },
};

module.exports = resolvers;
