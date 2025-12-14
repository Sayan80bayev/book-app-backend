import type { Review } from "@/core/domain/review.js";

export interface IReviewRepo {
  create(review: Review): Promise<Review>;

  findByBook(bookId: string): Promise<Review[]>;
  findByUser(userId: string): Promise<Review[]>;

  findByBookAndUser(
    bookId: string,
    userId: string
  ): Promise<Review | null>;

  delete(id: string): Promise<void>;
}