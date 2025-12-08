import { Schema, model, Document, Types } from "mongoose";

export interface CategoryDocument extends Document {
  title: string;
  description: string;
  icon: string;
  parentCategoryId?: Types.ObjectId | null;
  isDeleted: boolean;
}

const CategorySchema = new Schema<CategoryDocument>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, minlength: 5 },
    icon: { type: String, required: true },
    parentCategoryId: { type: Schema.Types.ObjectId, ref: "Category", default: null },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const CategoryModel = model<CategoryDocument>("Category", CategorySchema);