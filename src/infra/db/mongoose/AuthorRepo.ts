import type { IAuthorRepo } from "@/core/ports/IAuthorRepo.js";
import type { Author } from "@/core/domain/author.js";
import type { AuthorDocument } from "./AuthorModel.js";
import type { Types } from "mongoose";
import { AuthorModel } from "./AuthorModel.js";

function mapAuthorDocumentToAuthor(doc: AuthorDocument): Author {
  const obj = doc.toObject() as {
    _id: Types.ObjectId;
    name: string;
    bio: string;
    birthDate: Date;
    nationality: string;
    isDeleted: boolean;
  };

  return {
    id: obj._id.toString(),
    name: obj.name,
    bio: obj.bio,
    birthDate: obj.birthDate,
    nationality: obj.nationality,
    isDeleted: obj.isDeleted
  };
}

export class AuthorRepo implements IAuthorRepo {
    async create(author: Author): Promise<Author> {
    const { id, ...rest } = author;
    const doc = await AuthorModel.create({
        ...rest,
    });
    return mapAuthorDocumentToAuthor(doc);
    }

  async findById(id: string): Promise<Author | null> {
    const doc = await AuthorModel.findById(id).where({ isDeleted: false });
    return doc ? mapAuthorDocumentToAuthor(doc) : null;
  }

  async findAll(): Promise<Author[]> {
    const docs = await AuthorModel.find({ isDeleted: false });
    return docs.map(mapAuthorDocumentToAuthor);
  }

  async update(id: string, update: Partial<Author>): Promise<Author | null> {
    const doc = await AuthorModel.findByIdAndUpdate(id, update, { new: true });
    return doc ? mapAuthorDocumentToAuthor(doc) : null;
  }

  async softDelete(id: string): Promise<void> {
    await AuthorModel.findByIdAndUpdate(id, { isDeleted: true });
  }
}