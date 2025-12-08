import { gql } from "apollo-server";
export const typeDefs = gql `
  type Author {
    id: ID!
    name: String!
    bio: String!
    birthDate: String!
    nationality: String!
    isDeleted: Boolean!
  }

  input CreateAuthorInput {
    name: String!
    bio: String!
    birthDate: String!
    nationality: String!
  }

  input UpdateAuthorInput {
    name: String
    bio: String
    birthDate: String
    nationality: String
  }

  type Query {
    author(id: ID!): Author
    authors: [Author!]!
  }

  type Mutation {
    createAuthor(input: CreateAuthorInput!): Author!
    updateAuthor(id: ID!, input: UpdateAuthorInput!): Author
    deleteAuthor(id: ID!): Boolean!
  }
`;
//# sourceMappingURL=schema.js.map