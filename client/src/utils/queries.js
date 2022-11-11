import { gql } from "@apollo/client";

export const QUERY_PROFILES = gql`
  query allProfiles {
    profiles {
      _id
      name
      skills
    }
  }
`;

export const QUERY_SINGLE_PROFILE = gql`
  query singleProfile($userInfo: STRING!) {
    userByName(userInfo: $userInfo) {
      username
      sentGameInvites
      sentFriendInvites
      gameInvites
      gameSessions
      friends
      friendInvites
      avatar
      admin
      _id
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      name
      skills
    }
  }
`;

export const QUERY_MONSTERS = gql`
  query monsters {
    monsters {
    _id: String
    name: String
    flavorText: String
    attack: String
    defense: String
    image: String
    background: String
    color: String
    texture: String
    }
  }
`;
