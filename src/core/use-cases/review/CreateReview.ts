import type { IReviewRepo } from "@/core/ports/IReviewRepo.js";
import type { Review } from "@/core/domain/review.js";

export class CreateReview {
  constructor(private reviewRepo: IReviewRepo) {}

  async execute(input: Review): Promise<Review> {
    if (input.rating < 1 || input.rating > 5) {
      throw new Error("Rating must be between 1 and 5");
    }

    const existing = await this.reviewRepo.findByBookAndUser(
      input.bookId,
      input.userId
    );

    if (existing) {
      throw new Error("You already reviewed this book");
    }

    return this.reviewRepo.create(input);
  }
}