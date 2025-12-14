import type { IReviewRepo } from "@/core/ports/IReviewRepo.js";
import type { Review } from "@/core/domain/review.js";
import { ReviewModel } from "@/infra/db/mongoose/ReviewModel.js";

function mapDocToReview(doc: any): Review {
  const obj = doc.toObject();
  return {
    id: obj._id.toString(),
    bookId: obj.bookId.toString(),
    userId: obj.userId.toString(),
    rating: obj.rating,
    comment: obj.comment,
    createdAt: obj.createdAt
  };
}

export class ReviewRepo implements IReviewRepo {
  async create(review: Review): Promise<Review> {
    const doc = await ReviewModel.create(review);
    return mapDocToReview(doc);
  }

  async findByBook(bookId: string): Promise<Review[]> {
    const docs = await ReviewModel.find({ bookId });
    return docs.map(mapDocToReview);
  }

  async findByUser(userId: string): Promise<Review[]> {
    const docs = await ReviewModel.find({ userId });
    return docs.map(mapDocToReview);
  }

  async findByBookAndUser(bookId: string, userId: string) {
  const doc = await ReviewModel.findOne({ bookId, userId });
  return doc ? mapDocToReview(doc) : null;
}

  async delete(id: string): Promise<void> {
    await ReviewModel.findByIdAndDelete(id);
  }
}