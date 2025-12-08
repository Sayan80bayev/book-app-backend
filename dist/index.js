import { ApolloServer } from "apollo-server";
import mongoose from "mongoose";
import { typeDefs } from "./app/graphql/schema.js";
import { authorResolvers } from "./app/graphql/resolvers/author.resolver.js";
import { AuthorRepo } from "./infra/db/mongoose/AuthorRepo.js";
import { CreateAuthor } from "./core/use-cases/author/CreateAuthor.js";
import { GetAuthor } from "./core/use-cases/author/GetAuthor.js";
import { UpdateAuthor } from "./core/use-cases/author/UpdateAuthor.js";
import { DeleteAuthor } from "./core/use-cases/author/DeleteAuthor.js";
const MONGO_USER = process.env.MONGO_USER || "root";
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "example";
const MONGO_DB = process.env.MONGO_DB || "bookapp";
const MONGO_HOST = process.env.MONGO_HOST || "localhost";
const MONGO_PORT = process.env.MONGO_PORT || "27017";
const MONGO_URI = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;
await mongoose.connect(MONGO_URI);
const authorRepo = new AuthorRepo();
const createAuthorUC = new CreateAuthor(authorRepo);
const getAuthorUC = new GetAuthor(authorRepo);
const updateAuthorUC = new UpdateAuthor(authorRepo);
const deleteAuthorUC = new DeleteAuthor(authorRepo);
const server = new ApolloServer({
    typeDefs,
    resolvers: authorResolvers,
    context: () => ({
        createAuthor: createAuthorUC,
        getAuthor: getAuthorUC,
        updateAuthor: updateAuthorUC,
        deleteAuthor: deleteAuthorUC
    })
});
server.listen().then(({ url }) => {
    console.log(`Server running at ${url}`);
});
//# sourceMappingURL=index.js.map