import { GraphQLError } from "graphql";

import type { CreateReview } from "@/core/use-cases/review/CreateReview.js";
import type { GetReviews } from "@/core/use-cases/review/GetReviews.js";
import type { DeleteReview } from "@/core/use-cases/review/DeleteReview.js";
import type { GetBook } from "@/core/use-cases/book/GetBook.js";

export const reviewResolvers = {
  Query: {
    reviewsByBook: async (
      _: any,
      { bookId }: { bookId: string },
      { getReviews }: { getReviews: GetReviews }
    ) => {
      return getReviews.byBook(bookId);
    },

    myReviews: async (
      _: any,
      __: any,
      { getReviews, contextUserId }: { getReviews: GetReviews; contextUserId: string }
    ) => {
      if (!contextUserId) {
        throw new GraphQLError("Not authenticated", {
          extensions: { code: "UNAUTHENTICATED" }
        });
      }

      return getReviews.byUser(contextUserId);
    }
  },

  Mutation: {
    createReview: async (
      _: any,
      { input }: any,
      {
        createReview,
        getBook,
        contextUserId
      }: {
        createReview: CreateReview;
        getBook: GetBook;
        contextUserId: string;
      }
    ) => {
      if (!contextUserId) {
        throw new GraphQLError("Not authenticated", {
          extensions: { code: "UNAUTHENTICATED" }
        });
      }

      const book = await getBook.execute(input.bookId);
      if (!book) {
        throw new GraphQLError("Book not found", {
          extensions: { code: "NOT_FOUND" }
        });
      }

      return createReview.execute({
        ...input,
        id: "",
        userId: contextUserId,
        bookAuthorId: book.authorId,
        createdAt: new Date()
      });
    },

    deleteReview: async (
      _: any,
      { id }: { id: string },
      { deleteReview }: { deleteReview: DeleteReview }
    ) => {
      await deleteReview.execute(id);
      return true;
    }
  }
};