import { gql } from "apollo-server";

export const typeDefs = gql`

  # USER

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

  # BOOK

  type Book {
    id: ID!
    title: String!
    description: String!
    publishYear: Int!
    authorId: ID!
    categories: [ID!]!
    isDeleted: Boolean!
  }

  input CreateBookInput {
    title: String!
    description: String!
    publishYear: Int!
    categories: [ID!]!
  }

  input UpdateBookInput {
    title: String
    description: String
    publishYear: Int
    categories: [ID!]
  }

  # CATEGORY

  type Category {
    id: ID!
    title: String!
    description: String!
    icon: String!
    parentCategoryId: ID
  }

  input CreateCategoryInput {
    title: String!
    description: String!
    icon: String!
    parentCategoryId: ID
  }

  # REVIEW

  type Review {
    id: ID!
    bookId: ID!
    userId: ID!
    rating: Int!
    comment: String
    createdAt: String!
  }

  input CreateReviewInput {
    bookId: ID!
    rating: Int!
    comment: String
  }

  # ROOT QUERY

  type Query {
    # User
    user(id: ID!): User
    users: [User!]!

    # Book
    book(id: ID!): Book
    books: [Book!]!
    booksByAuthor(authorId: ID!): [Book!]!

    # Category
    categories: [Category!]!
    category(id: ID!): Category

    # Review
    reviewsByBook(bookId: ID!): [Review!]!
    myReviews: [Review!]!
  }

  # ROOT MUTATION

  type Mutation {
    # User
    registerUser(input: RegisterUserInput!): AuthPayload!
    loginUser(input: LoginUserInput!): AuthPayload!
    updateUser(id: ID!, input: UpdateUserInput!): User
    deleteUser(id: ID!): Boolean!

    # Book
    createBook(input: CreateBookInput!): Book!
    updateBook(id: ID!, input: UpdateBookInput!): Book
    deleteBook(id: ID!): Boolean!

    # Category
    createCategory(input: CreateCategoryInput!): Category!
    deleteCategory(id: ID!): Boolean!

    # Review
    createReview(input: CreateReviewInput!): Review!
    deleteReview(id: ID!): Boolean!
  }
`;