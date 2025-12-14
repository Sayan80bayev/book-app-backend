import type { IReviewRepo } from "@/core/ports/IReviewRepo.js";
import type { Review } from "@/core/domain/review.js";

export class GetReviews {
  constructor(private reviewRepo: IReviewRepo) {}

  byBook(bookId: string): Promise<Review[]> {
    return this.reviewRepo.findByBook(bookId);
  }

  byUser(userId: string): Promise<Review[]> {
    return this.reviewRepo.findByUser(userId);
  }
}