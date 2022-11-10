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
export const SEND_FRIEND_REQUEST = gql`
  mutation sendFriendRequest($username: String!, $newFriend: String!) {
    addSkill(username: $username, newFriend: $newFriend) {
      _id
      name
      skills
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
// export const REMOVE_SKILL = gql`
//   mutation removeSkill($skill: String!) {
//     removeSkill(skill: $skill) {
//       _id
//       name
//       skills
//     }
//   }
// `;
