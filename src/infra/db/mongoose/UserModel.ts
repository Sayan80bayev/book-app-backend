import { Schema, model, Document } from "mongoose";

export interface UserDocument extends Document {
  username: string;
  password: string;
  bio: string;
  birthDate: Date;
  nationality: string;
  isDeleted: boolean;
}

const UserSchema = new Schema<UserDocument>(
  {
    username: { type: String, required: true, trim: true, minlength: 2 },
    password: {type: String, required: true },
    bio: { type: String, required: true, minlength: 10 },
    birthDate: { type: Date, required: true },
    nationality: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

UserSchema.index({ username: 1 }, { unique: true, partialFilterExpression: { isDeleted: false } });

export const UserModel = model<UserDocument>("User", UserSchema);