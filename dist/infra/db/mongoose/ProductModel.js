import { Schema, model, Document, Types } from "mongoose";
const ProductSchema = new Schema({
    name: { type: String, required: true, trim: true, minlength: 2 },
    description: { type: String, required: true, minlength: 10 },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, min: 0 },
    categoryId: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    isDeleted: { type: Boolean, default: false },
}, { timestamps: true });
export const ProductModel = model("Product", ProductSchema);
//# sourceMappingURL=ProductModel.js.map