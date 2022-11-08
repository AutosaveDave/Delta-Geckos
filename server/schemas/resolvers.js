const { User, Monster, Reward, GameSession, MonsterMod, CombatMod } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const resolvers = {
  Query: {
    users: async () => {
      return User.find({});
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

    rewards: async() => {
      return Reward.find();
    },

    monsterMods: async () => {
      return MonsterMod.find();
    },

    combatMods: async () => {
      return CombatMod.find();
    },
    
    playerView: async(parent, { gameId, playerId }, context ) => {
      const playerInfo = await GameSession.findById(gameId).player.findOne( { pid: playerId } );
      const opponentInfo = await GameSession.findById(gameId).player.findOne( { pid: { $ne: playerId } } ).select("pid rewards played discarded");
      let oppPlayed = false;
      if(opponentInfo.played) {
        oppPlayed = true;
      }
      const arenaInfo = await GameSession.findById(gameId).select("rewardsInPlay chatLog roundLog ongoing");
      const me = await User.findById(playerInfo.pid).username;
      const opp = await User.findById(opponentInfo.pid).username;
      return { 
        pid: playerInfo.pid,
        pUsername: me,
        oppId: opponentInfo.pid,
        oppUsername: opp,
        rewards: playerInfo.rewards, 
        hand: playerInfo.hand,
        played: playerInfo.played,
        discarded: playerInfo.discarded,
        opponentPlayed: oppPlayed,
        rewardsInPlay: arenaInfo.rewardsInPlay,
        opponentRewards: opponentInfo.rewards
      }
    }
  },

  Mutation: {
    addUser: async (parent, args ) => {
      const user = await User.create({ 
        username: args.input.username,
        password: args.input.password,
        admin: false, 
        loggedIn: false
      });
      console.log(user);
      const token = await signToken( user );
      console.log("token");
      console.log(token);
      return { token, user };
    },

    inviteFriend: async ( parent, args ) => {
      const friend = await User.updateOne( 
        { username: args.input.newFriend, friendInvites: {$ne: args.input.username}, sentFriendInvites: {$ne: args.input.username} },
        { $push: { friendInvites: [args.input.username] } }, { new: true } );
      const user = await User.updateOne( 
        { username: args.input.username, friendInvites: {$ne: args.input.newFriend}, sentFriendInvites: {$ne: args.input.newFriend} },
        { $push: { sentFriendInvites: [args.input.newFriend] } }, { new: true } );
      if( friend && user ) {
        return "FRIEND REQUEST SENT!"
      }
      return "Friend request failed!"
    },
    acceptFriend: async ( parent, args ) => {
      await User.updateOne(
        { username: args.input.newFriend }
      )
    }

    newGameSession: async (parent, { user, opp }) => {
      // if (user) {
      //   const order = new Order({ products });

      //   await User.findByIdAndUpdate(user.id, {
      //     $push: { orders: order },
      //   });

      //   return order;
      // }
      return {nothing: '0'};

      //throw new AuthenticationError('Not logged in');
    },

    login: async (parent, args) => {
      console.log(args);
      const user = await User.findOneAndUpdate( { username: args.input.username }, { loggedIn: true }, { new: true } );

      console.log(user);
      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(args.input.password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const token = signToken(user);

      return { token, user };
    },
  },
};

module.exports = resolvers;
