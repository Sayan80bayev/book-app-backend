import { Schema, model, Document } from "mongoose";

export interface AuthorDocument extends Document {
  name: string;
  bio: string;
  birthDate: Date;
  nationality: string;
  isDeleted: boolean;
}

const AuthorSchema = new Schema<AuthorDocument>(
  {
    name: { type: String, required: true, trim: true, minlength: 2 },
    bio: { type: String, required: true, minlength: 10 },
    birthDate: { type: Date, required: true },
    nationality: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const AuthorModel = model<AuthorDocument>("Author", AuthorSchema);