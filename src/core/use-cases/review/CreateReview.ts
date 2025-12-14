import type { IReviewRepo } from "@/core/ports/IReviewRepo.js";
import type { IEventBus } from "@/core/ports/IEventBus.js";
import type { Review } from "@/core/domain/review.js";

export class CreateReview {
  constructor(
    private reviewRepo: IReviewRepo,
    private eventBus: IEventBus
  ) {}

  async execute(
    input: Review & { bookAuthorId: string }
  ): Promise<Review> {
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

    const review = await this.reviewRepo.create(input);

    this.eventBus.publish("BOOK_REVIEWED", {
      userId: input.bookAuthorId,
      bookId: input.bookId,
      rating: input.rating
    });

    return review;
  }
}