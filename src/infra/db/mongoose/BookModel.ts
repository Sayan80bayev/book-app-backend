import { Schema, model, Document, Types } from "mongoose";

export interface BookDocument extends Document {
  title: string;
  description: string;
  publishYear: number;
  authorId: Types.ObjectId;
  categories: Types.ObjectId[];
  isDeleted: boolean;
}

const BookSchema = new Schema<BookDocument>(
  {
    title: { type: String, required: true, trim: true, minlength: 3 },
    description: { type: String, required: true, minlength: 10 },
    publishYear: { type: Number, required: true, min: 1000 },
    authorId: { type: Schema.Types.ObjectId, ref: "Author", required: true },
    categories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const BookModel = model<BookDocument>("Book", BookSchema);