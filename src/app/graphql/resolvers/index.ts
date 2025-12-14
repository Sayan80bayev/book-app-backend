import { userResolvers } from "./user.resolver.js";
import { bookResolvers } from "./book.resolver.js";
import { categoryResolvers } from "./category.resolver.js";
import { reviewResolvers } from "./review.resolver.js";

export const resolvers = [
  userResolvers,
  bookResolvers,
  categoryResolvers,
  reviewResolvers
];