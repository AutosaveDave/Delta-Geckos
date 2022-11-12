const { User, Monster, Reward, GameSession, MonsterMod, CombatMod } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { findOne } = require('../models/User');
const mongoose = require('mongoose');
const { listenerCount } = require('../models/ChatLog');

function shuffle( deck ) {
  let a, b, temp;
  for ( a = 0; a < deck.length; a++ ) {
    b = Math.floor(Math.random() * (a + 1));            
    temp = deck[a];
    deck[a] = deck[b];
    deck[b] = temp;
  }
  return [...deck];
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
      return Monster.find({});
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
    // userGold: async (args) => {
    //   //------------------------------------------------- NOT FINISHED
    //   GameSession.find( { "player.username": args.username } ).select("") //----------------
    // },
    
    playerView: async(parent, args) => {
      const game = await GameSession.findOne( { _id: args.gameId } );
      if( !game ) { throw new AuthenticationError('Game not found!'); }
      console.log(game);
      const user = game.player[0];
      const opp = game.player[1];
        let pView = {
        gameId: args.gameId,
        rewards: [...user.rewards],
        hand: [...user.hand],
        played: user.played,
        discarded: [...user.discarded],
        opponentPlayed: opp.played,
        rewardsInPlay: [...game.rewardsInPlay],
        opponentRewards: [...opp.rewards],
      };
      console.log(pView);

      for( let a=0 ; a < pView.hand.length ; a++ ) {
        pView.hand[a] = pView.hand[a].toString();
      }
      for( let a=0 ; a < pView.discarded.length ; a++ ) {
        pView.discarded[a] = pView.discarded[a].toString();
      }
      for( let a=0 ; a < pView.rewards.length ; a++ ) {
        pView.rewards[a] = pView.rewards[a].toString();
      }
      for( let a=0 ; a < pView.rewardsInPlay.length ; a++ ) {
        pView.rewardsInPlay[a] = pView.rewardsInPlay[a].toString();
      }
      for( let a=0 ; a < pView.opponentRewards.length ; a++ ) {
        pView.opponentRewards[a] = pView.opponentRewards[a].toString();
      }

      return pView;
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
        { _id: args.gameId, "player.$.username": {$ne: args.username} },
        { $push: { player: [ {
            username: args.username,
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
      if( !correctPw ) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const token = signToken(user);

      return { token, user };
    },

    startGame: async (parent, args) => {
      let monsterIdArray = await Monster.find( {} ).distinct('_id');
      for( let a=0 ; a < monsterIdArray.length ; a++ ) {
        monsterIdArray[a] = monsterIdArray[a].toString();
      }
       console.log(monsterIdArray) ;
      const monsterArray = shuffle(monsterIdArray);
      console.log(monsterArray);
      // Get all reward card id's as an array and shuffle the array elements
      let rewardIdArray = await Reward.find( {} ).distinct('_id');
      for( let a = 0 ; a < rewardIdArray.length ; a++ ) {
        rewardIdArray[a] = rewardIdArray[a].toString();
      }
      const rewardArray = shuffle(rewardIdArray);
      // Create new GameSession
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
            id: "user"
          },
          {
            username: "THE MACHINE",
            rewards: [],
            hand: [],
            played: null,
            discarded: [],
            survived: null,
            won: null,
            id: "machine"
          }
        ],
        deck: monsterArray,
        rewardsDeck: rewardArray,
        rewardsInPlay: [],
        chatLog: [],
        roundLog: [],
        ongoing: true,
        openGame: false,
        _id : new mongoose.Types.ObjectId(),
      });

      if( !newGame ) { throw new AuthenticationError('create new GameSession failed!');}
      const user = await User.updateOne( 
        { username: args.username },
        { $push: { gameSessions: [newGame._id] } }, { new: true } );
      if( !user ) { throw new AuthenticationError('User gamesessions[] push failed!');}
      const pView = await resolvers.Query.playerView({},{ gameId: newGame._id.toString() } );
      return pView;
    },
    

    // Both players draw a card. Returns updated PlayerView
    drawCards: async (parent, args) => {
      const gid = mongoose.ObjectId(args.gameId);
      const game = await GameSession.findOne( { _id: gid } ).lean();
      console.log("-----------GAME-----------");
      console.log(game);
      if( !game ) { throw new AuthenticationError('Game not found!'); }
      let user = game.player[0];
      console.log(user);
      let opp = game.player[1];
      let userCard = game.deck[0];
      let oppCard = game.deck[1];
      userCard = userCard.toString();
      console.log("---------USERCARD--------");
      console.log(userCard);
      //oppCard = oppCard.toString();
      // const userhand = [...user.hand];
      // const opphand = [...opp.hand];
      // user.hand=[];
      // opp.hand=[];
      // const p1Hand=[...userhand, userCard];
      // const compHand=[...opphand, oppCard];
      
      // for( let a = 0 ; a < p1Hand.length ; a++ ) {
      //   p1Hand[a]=p1Hand[a].toString();
      // }
      // for( let a = 0 ; a < compHand.length ; a++ ) {
      //   compHand[a]=compHand[a].toString();
      // }

      // console.log("------------------P1HAND FOLLOWS--------------------");
      // console.log([...p1Hand]);

      const game2 = await GameSession.updateOne( { _id: gid },
          { 
            $push: { "player.$[us].hand": [userCard] },
            // $push: { "player.$[op].hand": [oppCard] },
            // $pull: { deck: userCard },
            // $pull: { deck: oppCard } },
          },
          { new: true, arrayFilters: [ { "us.who": "user" }
          // , { "op.who": "machine" }
         ] } 
        );
      // // const game3 = await GameSession.updateOne( { _id: args.gameId},
      // //     { 
      // //       $push: {"player.$[u].hand": [userCard] },
      // //       $push: {"player.$[op].hand": [oppCard]},
      // //       $pull: { "deck": userCard },
      // //       $pull: { "deck": oppCard }, }, 
      // //     { new: true, arrayFilter: [ { "u": { who: "user" } } ], arrayFilter: [ { "op": { who: "machine"} } ] } 
      // //   );
      //   // {
      //   //   $pull: { deck: userCard },
      //   //   $pull: { deck: oppCard },
      //   //   //$pullAll: {"player.0.hand"},
      //   //   //$pullAll: {"player.1.hand"},
      //   //   $push: { "player.hand": [userCard] },
      //   //   $push: { "player.hand": [oppCard] }
      //   // }, { new: true } );

      //   console.log("GAME2 FOLLOWS---------------");
      //   console.log(game2);

      if( !game2 ) { throw new AuthenticationError('Game not found!'); }

      const pView = await resolvers.Query.playerView({}, { gameId: game._id.toString() } );
      console.log("---------pView----------");
        console.log(pView);
        console.log("-------^-pView--^-------");
      if( !pView ) { throw new AuthenticationError('playerView Query failed!'); }

      return pView;
    },

    // dealHands: async (parent, args) => {
      // const game = await GameSession.updateOne(

      //   { _id: args.gameId },
      //   { $pull: {deck: {$slice: [0,4] } },
      //   $push: {  } },
      //   {new: false}
      // );
    //   return '0';
    // }
  }
}

module.exports = resolvers;
