const { gql } = require('apollo-server-express');

const typeDefs = gql`

  type ChatLog {
    from: ID!
    text: String
  }

   
  type Player {
    pid: ID!
    rewards: [ID]
    hand: [ID]
    played: ID
    discarded: [ID]
  }

  type PlayerView {
    pid: ID!
    pUsername: String
    oppId: ID
    oppUsername: String
    rewards: [ID]
    hand: [ID]
    played: ID
    discarded: [ID]
    opponentPlayed: Boolean
    rewardsInPlay: [ID]
    opponentRewards: [ID]
  }

  type RoundLog {
    player: [Player]
    monsterDeck: [ID]
    rewardDeck: [ID]
    reward: [ID]
  }

  type GameSession {
    _id: ID!
    player: [Player]
    deck: [ID]
    rewardsDeck: [ID]
    rewardsInPlay: [ID]
    chatLog: [ChatLog]
    roundLog: [RoundLog]
    ongoing: Boolean
  }

  type User {
    _id: ID!
    username: String!
    password: String!
    friends: [ID]
    friendInvites: [String]
    sentFriendInvites: [String]
    gameSessions: [ID]
    gameInvites: [String]
    sentGameInvites: [String]
    avatar: String
    admin: Boolean!
    loggedIn: Boolean!
  }

  type UserAuthObj {
    username: String!
    _id: ID!
  }

  type Auth {
    token: ID!
    user: UserAuthObj
  }

  type CombatMod {
    _id: ID!
    name: String
    image: String
    color: String
    description: String
    effectId: String
  }

  type MonsterMod {
    _id: ID!
    name: String
    image: String
    color: String
    description: String
    effectId: String
  }

  type Monster {
    _id: ID!
    name: String
    flavorText: String
    attack: String
    defense: String
    mods: [MonsterMod]
    image: String
    background: String
    color: String
    texture: String
  }

  type Reward {
    _id: ID!
    name: String
    gold: String
    mods: [CombatMod]
    image: String
    background: String
    color: String
    texture: String
  }

  input LoginInfo {
    username: String!
    password: String!
  }

  input NewGameInfo {
    username: String!
    opponent: String
  }

  input AddFriendInfo {
    username: String!
    newFriend: String!
  }

  type Query {
    users: [User]
    userByName(username: String): User
    userById: User
    gamesOngoing: [GameSession]
    gamesByUserId: [GameSession]
    monsters: [Monster]

    monsterMods: [MonsterMod]
    rewards: [Reward]
    combatMods: [CombatMod]
    playerView(gameId: ID!, _id:ID!): PlayerView
  }

  type Mutation {
    addUser(username: String!, password:String!): Auth
    login(username: String!, password:String!): Auth
    inviteFriend(input: AddFriendInfo!): String
    acceptFriend(input: AddFriendInfo!): String
    newGameSession(input: NewGameInfo!): GameSession

  }
`;

module.exports = typeDefs;
