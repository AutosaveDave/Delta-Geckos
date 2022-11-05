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
    played: [ID]
    discarded: [ID]
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
    friends: [User]
    gameSessions: [GameSession]
    admin: Boolean!
  }

  type Auth {
    token: ID
    user: User
  }

  type CombatMod {
    _id: ID!
    name: String
    image: Number
    color: Number
    description: String
    effectId: Number
  }

  type MonsterMod {
    _id: ID!
    name: String
    image: Number
    color: Number
    description: String
    effectId: Number
  }

  type Monster {
    _id: ID!
    name: String
    flavorText: String
    attack: Number
    defense: Number
    mods: [MonsterMod]
    image: Number
    background: Number
    color: Number
    texture: Number
  }

  type Reward {
    _id: ID!
    name: String
    gold: Number
    mods: [CombatMod]
    image: Number
    background: Number
    color: Number
    texture: Number
  }

  type Query {
    users:
  }

  type Mutation {

  }
`;

module.exports = typeDefs;
