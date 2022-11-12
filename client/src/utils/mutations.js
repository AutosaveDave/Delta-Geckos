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
  mutation startGame($username: String!) {
    startGame(username: $username) {
      gameId
      rewards
      hand
      played
      discarded
      opponentPlayed
      rewardsInPlay
      opponentRewards
    }
  }`;

export const PLAY_MONSTER = gql`
  mutation playMonster($gameId: String!, $monsterId: String!) {
    playMonster(gameId: $gameId, monsterId: $monsterId) {
      gameId
      rewards
      hand
      played
      discarded
      opponentPlayed
      rewardsInPlay
      opponentRewards
    }
  }
  `;

// 