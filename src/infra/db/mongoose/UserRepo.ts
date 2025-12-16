import type { IUserRepo } from "@/core/ports/IUserRepo.js";
import type { User } from "@/core/domain/user.js";
import type { UserDocument } from "./UserModel.js";
import type { Types } from "mongoose";
import { UserModel } from "./UserModel.js";


function mapUserDocumentToUser(doc: UserDocument): User {
  const obj = doc.toObject() as {
    _id: Types.ObjectId;
    username: string;
    password: string;
    bio: string;
    birthDate: Date;
    nationality: string;
    isDeleted: boolean;
  };

  return {
    id: obj._id.toString(),
    username: obj.username,
    password: obj.password,
    bio: obj.bio,
    birthDate: obj.birthDate,
    nationality: obj.nationality,
    isDeleted: obj.isDeleted
  };
}

export class UserRepo implements IUserRepo {
  async create(user: User): Promise<User> {
    const { id, ...rest } = user;
    try {
      const doc = await UserModel.create({
        ...rest
      });
      return mapUserDocumentToUser(doc);
    } catch (err: any) {
      // Mongo duplicate key error
      if (err && (err.name === "MongoServerError" || err.name === "MongoError") && err.code === 11000) {
        throw new Error("Username already exists");
      }
      throw err;
    }
  }

  async findById(id: string): Promise<User | null> {
    const doc = await UserModel.findById(id).where({ isDeleted: false });
    return doc ? mapUserDocumentToUser(doc) : null;
  }

  async findByUsername(username: string): Promise<User | null> {
    const doc = await UserModel.findOne({ username, isDeleted: false });
    return doc ? mapUserDocumentToUser(doc) : null;
  }

  async findAll(): Promise<User[]> {
    const docs = await UserModel.find({ isDeleted: false });
    return docs.map(mapUserDocumentToUser);
  }

  async update(id: string, update: Partial<User>): Promise<User | null> {
    const doc = await UserModel.findByIdAndUpdate(id, update, { new: true });
    return doc ? mapUserDocumentToUser(doc) : null;
  }

  async softDelete(id: string): Promise<void> {
    await UserModel.findByIdAndUpdate(id, { isDeleted: true });
  }
}