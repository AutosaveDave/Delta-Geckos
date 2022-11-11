import { gql } from "@apollo/client";
export const ADD_USER = gql`
  mutation addUser($username: String!, $password: String!) {
    addUser(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;



export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      user {
        username
        _id
      }
      token
    }
  }
`;

// Start a game
export const START_GAME = gql`
  mutation startGame($gameId: String!, $username: String!) {
    startGame(gameId: $gameId, username: $username) {
      pUsername: String
      rewards: [String]
      hand: [String]
      played: String
      discarded: [String]
      opponentPlayed: String
      rewardsInPlay: [String]
      opponentRewards: [String]
    }
  }`

export const PLAY_MONSTER = gql`
  mutation playMonster($gameId: String!, $username: String!) {
    playMonster(gameId: $gameId, $username: username) {
      pUsername: String
      rewards: [String]
      hand: [String]
      played: String
      discarded: [String]
      opponentPlayed: String
      rewardsInPlay: [String]
      opponentRewards: [String]
    }
  }
  `

// 