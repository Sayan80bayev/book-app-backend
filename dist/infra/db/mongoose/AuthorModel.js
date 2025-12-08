import { Schema, model, Document } from "mongoose";
const AuthorSchema = new Schema({
    name: { type: String, required: true, trim: true, minlength: 2 },
    bio: { type: String, required: true, minlength: 10 },
    birthDate: { type: Date, required: true },
    nationality: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
}, { timestamps: true });
export const AuthorModel = model("Author", AuthorSchema);
//# sourceMappingURL=AuthorModel.js.map