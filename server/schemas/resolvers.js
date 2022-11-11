const { User, Monster, Reward, GameSession, MonsterMod, CombatMod } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { findOne } = require('../models/User');

function shuffle( deck ) {
  let a, b, temp;
  for ( a = 0; a < deck.length; a++ ) {
    b = Math.floor(Math.random() * (a + 1));            
    temp = deck[a];
    deck[a] = deck[b];
    deck[b] = temp;
  }
  return deck;
}

const resolvers = {
  Query: {
    users: async () => {
      return User.find({});
    },

    userByName: async (parent, args ) => {
      return User.findOne( { username: args.username } );
    },

    userById: async (parent, args ) => {
      return User.findOne( { _id: args._id } );
    },

    gamesOngoing: async () => {
      return GameSession.find( { ongoing: true } );
    },

    gamesByUserId: async (parent, args ) => {
      return GameSession.find(  { "player.pid" : args._id } );
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
        username: args.username,
        password: args.password,
        admin: false, 
        loggedIn: false
      });
      const token = await signToken( user );
      return { token, user };
    },

    inviteFriend: async ( parent, args ) => {
      const friend = await User.updateOne( 
        { username: args.newFriend, friendInvites: {$ne: args.username}, sentFriendInvites: {$ne: args.username} },
        { $push: { friendInvites: [args.username] } }, { new: true } );
      const user = await User.updateOne( 
        { username: args.username, friendInvites: {$ne: args.newFriend}, sentFriendInvites: {$ne: args.newFriend} },
        { $push: { sentFriendInvites: [args.newFriend] } }, { new: true } );
      if( friend && user ) {
        return "FRIEND REQUEST SENT!";
      }
      return "Friend request failed!";
    },

    acceptFriend: async ( parent, args ) => {
      const friend = await User.updateOne( 
        { username: args.newFriend, friends: { $ne: args.username}},
        { $push: { friends: [args.username] }, $pull: { sentFriendInvites: args.username } }, { new: true } );
      const user = await User.updateOne( 
        { username: args.username, friends: { $ne: args.newFriend}},
        { $push: { friends: [args.newFriend] }, $pull: { friendInvites: args.newFriend } }, { new: true } );
      if(friend && user) {
        return "FRIEND REQUEST ACCEPTED!";
      } else {
        return "Failed to accept friend request!";
      }
    },

    sendGameInvite: async (parent, args) => {
      const otherUser = await User.updateOne( 
        { username: args.otherUsername, gameInvites: {$ne: args.username} },
        { $push: { gameInvites: [args.username] } }, { new: true } );
      const user = await User.updateOne( 
        { username: args.username, sentGameInvites: {$ne: args.otherUsername} },
        { $push: { sentGameInvites: [args.otherUsername] } }, { new: true } );
      if( otherUser && user ) {
        return "GAME INVITE SENT!";
      }
      return "Game invite failed!";
    },

    acceptGameInvite: async (parent, args) => {
      // Get all monster card id's as an array and shuffle the array elements
      let monsterIdArray = await Monster.find( {} ).distinct('_id');
      monsterIdArray = shuffle(monsterIdArray);
      // Get all reward card id's as an array and shuffle the array elements
      let rewardIdArray = await Reward.find( {} ).distinct('_id');
      rewardIdArray = shuffle(rewardIdArray);
      // Create new GameSession
      const newGame = await GameSession.create({ 
        player: [
          {
            username: args.otherUsername,
            rewards: [],
            hand: [],
            played: null,
            discarded: [],
            survived: null,
            won: null,
          },
          {
            username: args.username,
            rewards: [],
            hand: [],
            played: null,
            discarded: [],
            survived: null,
            won: null,
          }
        ],
        deck: monsterIdArray,
        rewardsDeck: rewardsIdArray,
        rewardsInPlay: [],
        chatLog: [],
        roundLog: [],
        ongoing: true,
        openGame: false,
      });
      const otherUser = await User.updateOne( 
        { username: args.otherUsername },
        { $push: { gameSessions: [newGame._id] }, $pull: { sentGameInvites: args.username } }, { new: true } );
      const user = await User.updateOne( 
        { username: args.username },
        { $push: { gameSessions: [newGame._id] }, $pull: { gameInvites: args.otherUsername } }, { new: true } );
      if( otherUser && user && newGame ) {
        return newGame._id;
      } else {
        return null;
      }
    },

    //------- creates an "open" gameSession (only one player slot filled- anyone can join)
    newOpenGameSession: async (parent, args) => {
      let monsterIdArray = await Monster.find( {} ).distinct('_id');
      monsterIdArray = shuffle(monsterIdArray);
      let rewardIdArray = await Reward.find( {} ).distinct('_id');
      rewardIdArray = shuffle(rewardIdArray);
      const newGame = await GameSession.create({ 
        player: [
          {
            username: args.username,
            rewards: [],
            hand: [],
            played: null,
            discarded: [],
            survived: null,
            won: null,
          }
        ],
        deck: monsterIdArray,
        rewardsDeck: rewardIdArray,
        rewardsInPlay: [],
        chatLog: [],
        roundLog: [],
        ongoing: true,
        openGame: true,
      });
      const user = await User.updateOne( 
        { username: args.username },
        { $push: { gameSessions: [newGame._id] } }, { new: true } );
      if( user && newGame && rewardIdArray && monsterIdArray) {
        return newGame._id;
      } else {
        return null;
      }
    },

    joinOpenGameSession: async (parent, args) => {
      const openGame = await GameSession.updateOne(
        { _id: args.gameId, "player.username": {$ne: args.username} },
        { $push: { player: [ {
            username: username,
            rewards: [],
            hand: [],
            played: null,
            discarded: [],
            survived: null,
            won: null,
          } ] }, 
          openGame: false 
        } );
      
      if(openGame){
        return args.gameId;
      } else {
        return null;
      }
    },

    login: async (parent, args) => {
      const user = await User.findOneAndUpdate(
        { username: args.username }, 
        { loggedIn: true }, 
        { new: true } );
      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(args.password);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const token = signToken(user);

      return { token, user };
    },
  },
};

module.exports = resolvers;
