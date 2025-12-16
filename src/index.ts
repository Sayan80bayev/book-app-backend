import { ApolloServer } from "apollo-server";
import mongoose from "mongoose";

import { typeDefs } from "@/app/graphql/schema.js";

import { resolvers } from "@/app/graphql/resolvers/index.js";

import { WebSocketServer } from "ws";
import { WebSocketEventBus } from "@/infra/events/WebSocketEventBus.js";
import { MONGO_URI, JWT_SECRET, WS_PORT, PORT } from "@/config.js";

import { UserRepo } from "@/infra/db/mongoose/UserRepo.js";
import { RegisterUser } from "@/core/use-cases/user/RegisterUser.js";
import { LoginUser } from "@/core/use-cases/user/LoginUser.js";
import { GetUser } from "@/core/use-cases/user/GetUser.js";
import { UpdateUser } from "@/core/use-cases/user/UpdateUser.js";
import { DeleteUser } from "@/core/use-cases/user/DeleteUser.js";

import { BookRepo } from "@/infra/db/mongoose/BookRepo.js";
import { CreateBook } from "@/core/use-cases/book/CreateBook.js";
import { GetBook } from "@/core/use-cases/book/GetBook.js";
import { UpdateBook } from "@/core/use-cases/book/UpdateBook.js";
import { DeleteBook } from "@/core/use-cases/book/DeleteBook.js";

import { CategoryRepo } from "@/infra/db/mongoose/CategoryRepo.js";
import { CreateCategory } from "@/core/use-cases/category/CreateCategory.js";
import { GetCategory } from "@/core/use-cases/category/GetCategory.js";
import { DeleteCategory } from "@/core/use-cases/category/DeleteCategory.js";

import { ReviewRepo } from "@/infra/db/mongoose/ReviewRepo.js";
import { CreateReview } from "@/core/use-cases/review/CreateReview.js";
import { GetReviews } from "@/core/use-cases/review/GetReviews.js";
import { DeleteReview } from "@/core/use-cases/review/DeleteReview.js";

await mongoose.connect(MONGO_URI);

const wss = new WebSocketServer({ port: WS_PORT });
const eventBus = new WebSocketEventBus(wss);

// USER
const userRepo = new UserRepo();
const registerUserUC = new RegisterUser(userRepo);
const loginUserUC = new LoginUser(userRepo);
const getUserUC = new GetUser(userRepo);
const updateUserUC = new UpdateUser(userRepo);
const deleteUserUC = new DeleteUser(userRepo);

// BOOK
const bookRepo = new BookRepo();
const createBookUC = new CreateBook(bookRepo);
const getBookUC = new GetBook(bookRepo);
const updateBookUC = new UpdateBook(bookRepo);
const deleteBookUC = new DeleteBook(bookRepo);

// CATEGORY
const categoryRepo = new CategoryRepo();
const createCategoryUC = new CreateCategory(categoryRepo);
const getCategoryUC = new GetCategory(categoryRepo);
const deleteCategoryUC = new DeleteCategory(categoryRepo);

// REVIEW
const reviewRepo = new ReviewRepo();
const createReviewUC = new CreateReview(reviewRepo, eventBus);
const getReviewsUC = new GetReviews(reviewRepo);
const deleteReviewUC = new DeleteReview(reviewRepo);

import jwt from "jsonwebtoken";

const server = new ApolloServer({
  typeDefs,
  resolvers,

  context: ({ req }) => {
    const token = req.headers.authorization?.split(" ")[1];
    let contextUserId: string | null = null;

    if (token) {
      try {
        const decoded = jwt.verify(token, JWT_SECRET) as any;
        contextUserId = decoded.id;
      } catch {
        contextUserId = null;
      }
    }

    return {
      // USER
      registerUser: registerUserUC,
      loginUser: loginUserUC,
      getUser: getUserUC,
      updateUser: updateUserUC,
      deleteUser: deleteUserUC,

      // BOOK
      createBook: createBookUC,
      getBook: getBookUC,
      updateBook: updateBookUC,
      deleteBook: deleteBookUC,

      // CATEGORY
      createCategory: createCategoryUC,
      getCategory: getCategoryUC,
      deleteCategory: deleteCategoryUC,

      // REVIEW
      createReview: createReviewUC,
      getReviews: getReviewsUC,
      deleteReview: deleteReviewUC,

      // AUTH
      contextUserId
    };
  }
});

server.listen().then(({ url }) => {
  console.log(`Server running at ${url}`);
});