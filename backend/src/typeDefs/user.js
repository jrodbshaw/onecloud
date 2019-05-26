import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    me: User @auth
    user(id: ID!): User @auth
    users: [User!]!
  }

  extend type Mutation {
    signUp(email: String!, password: String!): User @guest
    signIn(email: String!, password: String!): admissionResponse! @guest
    signOut: Boolean @auth
  }

  type User {
    id: ID!
    email: String!
    password: String!
    createdAt: String!
    token: String!
  }

  type admissionResponse {
    token: String
    user: User
  }
`;
