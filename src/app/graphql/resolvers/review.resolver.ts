import { GraphQLError } from "graphql";

import type { CreateReview } from "@/core/use-cases/review/CreateReview.js";
import type { GetReviews } from "@/core/use-cases/review/GetReviews.js";
import type { DeleteReview } from "@/core/use-cases/review/DeleteReview.js";

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
      { createReview, contextUserId }: { createReview: CreateReview; contextUserId: string }
    ) => {
      if (!contextUserId) {
        throw new GraphQLError("Not authenticated", {
          extensions: { code: "UNAUTHENTICATED" }
        });
      }

      return createReview.execute({
        ...input,
        id: "",
        userId: contextUserId,
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