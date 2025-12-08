import { Schema, model, Document, Types } from "mongoose";
const BookSchema = new Schema({
    title: { type: String, required: true, trim: true, minlength: 3 },
    description: { type: String, required: true, minlength: 10 },
    publishYear: { type: Number, required: true, min: 1000 },
    authorId: { type: Schema.Types.ObjectId, ref: "Author", required: true },
    categories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
    isDeleted: { type: Boolean, default: false },
}, { timestamps: true });
export const BookModel = model("Book", BookSchema);
//# sourceMappingURL=BookModel.js.map