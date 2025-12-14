import { GraphQLError } from "graphql";

import type { CreateBook } from "@/core/use-cases/book/CreateBook.js";
import type { GetBook } from "@/core/use-cases/book/GetBook.js";
import type { UpdateBook } from "@/core/use-cases/book/UpdateBook.js";
import type { DeleteBook } from "@/core/use-cases/book/DeleteBook.js";

export const bookResolvers = {
  Query: {
    book: async (
      _: any,
      { id }: { id: string },
      { getBook }: { getBook: GetBook }
    ) => {
      const book = await getBook.execute(id);
      if (!book) {
        throw new GraphQLError("Book not found", {
          extensions: { code: "NOT_FOUND" }
        });
      }
      return book;
    },

    books: async (_: any, __: any, { getBook }: { getBook: GetBook }) => {
      return getBook.executeAll();
    },

    booksByAuthor: async (
      _: any,
      { authorId }: { authorId: string },
      { getBook }: { getBook: GetBook }
    ) => {
      return getBook.byAuthor(authorId);
    }
  },

  Mutation: {
    createBook: async (
      _: any,
      { input }: any,
      { createBook, contextUserId }: { createBook: CreateBook; contextUserId: string }
    ) => {
      if (!contextUserId) {
        throw new GraphQLError("Not authenticated", {
          extensions: { code: "UNAUTHENTICATED" }
        });
      }

      return createBook.execute({
        ...input,
        id: "",
        authorId: contextUserId,
        isDeleted: false
      });
    },

    updateBook: async (
      _: any,
      { id, input }: any,
      { updateBook }: { updateBook: UpdateBook }
    ) => {
      const book = await updateBook.execute(id, input);
      if (!book) {
        throw new GraphQLError("Book not found", {
          extensions: { code: "NOT_FOUND" }
        });
      }
      return book;
    },

    deleteBook: async (
      _: any,
      { id }: { id: string },
      { deleteBook }: { deleteBook: DeleteBook }
    ) => {
      await deleteBook.execute(id);
      return true;
    }
  }
};