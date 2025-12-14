import { Schema, model, Document, Types } from "mongoose";

export interface ReviewDocument extends Document {
  bookId: Types.ObjectId;
  userId: Types.ObjectId;
  rating: number;
  comment?: string;
  createdAt: Date;
}

const ReviewSchema = new Schema<ReviewDocument>(
  {
    bookId: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comment: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: { createdAt: true, updatedAt: false }
  }
);

export const ReviewModel = model<ReviewDocument>("Review", ReviewSchema);