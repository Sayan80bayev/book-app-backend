import { gql } from "apollo-server";

export const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    bio: String!
    birthDate: String!
    nationality: String!
    isDeleted: Boolean!
  }

  type AuthPayload {
    user: User!
    token: String!
  }

  input RegisterUserInput {
    username: String!
    password: String!
    bio: String!
    birthDate: String!
    nationality: String!
  }

  input LoginUserInput {
    username: String!
    password: String!
  }

  input UpdateUserInput {
    username: String
    password: String
    bio: String
    birthDate: String
    nationality: String
  }

  type Query {
    user(id: ID!): User
    users: [User!]!
  }

  type Mutation {
    registerUser(input: RegisterUserInput!): AuthPayload!
    loginUser(input: LoginUserInput!): AuthPayload!
    updateUser(id: ID!, input: UpdateUserInput!): User
    deleteUser(id: ID!): Boolean!
  }
`;