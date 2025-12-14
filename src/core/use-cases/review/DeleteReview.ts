import type { IReviewRepo } from "@/core/ports/IReviewRepo.js";

export class DeleteReview {
  constructor(private reviewRepo: IReviewRepo) {}

  async execute(id: string): Promise<void> {
    await this.reviewRepo.delete(id);
  }
}