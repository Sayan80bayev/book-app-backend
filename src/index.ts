import { ApolloServer } from "apollo-server";
import mongoose from "mongoose";

import { typeDefs } from "@/app/graphql/schema.js";
import { userResolvers } from "@/app/graphql/resolvers/user.resolver.js";

import { UserRepo } from "@/infra/db/mongoose/UserRepo.js";
import { RegisterUser } from "@/core/use-cases/user/RegisterUser.js";
import { LoginUser } from "@/core/use-cases/user/LoginUser.js";
import { GetUser } from "@/core/use-cases/user/GetUser.js";
import { UpdateUser } from "@/core/use-cases/user/UpdateUser.js";
import { DeleteUser } from "@/core/use-cases/user/DeleteUser.js";

const MONGO_USER = process.env.MONGO_USER || "root";
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "example";
const MONGO_DB = process.env.MONGO_DB || "bookapp";
const MONGO_HOST = process.env.MONGO_HOST || "localhost";
const MONGO_PORT = process.env.MONGO_PORT || "27017";

const MONGO_URI = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;


await mongoose.connect(MONGO_URI);

const userRepo = new UserRepo();

const registerUserUC = new RegisterUser(userRepo);
const loginUserUC = new LoginUser(userRepo);
const getUserUC = new GetUser(userRepo);
const updateUserUC = new UpdateUser(userRepo);
const deleteUserUC = new DeleteUser(userRepo);

const server = new ApolloServer({
  typeDefs,
  resolvers: userResolvers,
  context: ({ req }) => {
    const token = req.headers.authorization?.split(" ")[1];
    let contextUserId: string | null = null;

    if (token) {
      try {
        const decoded = require("jsonwebtoken").verify(token, process.env.JWT_SECRET || "secret123");
        contextUserId = (decoded as any).id;
      } catch (err) {
        contextUserId = null;
      }
    }

    return {
      registerUser: registerUserUC,
      loginUser: loginUserUC,
      getUser: getUserUC,
      updateUser: updateUserUC,
      deleteUser: deleteUserUC,
      contextUserId
    };
  }
});

server.listen().then(({ url }) => {
  console.log(`Server running at ${url}`);
});