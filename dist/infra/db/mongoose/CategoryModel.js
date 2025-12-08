import { Schema, model, Document, Types } from "mongoose";
const CategorySchema = new Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, minlength: 5 },
    icon: { type: String, required: true },
    parentCategoryId: { type: Schema.Types.ObjectId, ref: "Category", default: null },
    isDeleted: { type: Boolean, default: false },
}, { timestamps: true });
export const CategoryModel = model("Category", CategorySchema);
//# sourceMappingURL=CategoryModel.js.map