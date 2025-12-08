import type { IBookRepo } from "@/core/ports/IBookRepo.js";
import type { Book } from "@/core/domain/book.js";
import type { BookDocument } from "./BookModel.js";
import { BookModel } from "./BookModel.js";
import  { Types } from "mongoose";


function mapBookDocumentToBook(doc: BookDocument): Book {
  const obj = doc.toObject();
  return {
    id: obj._id.toString(),
    title: obj.title,
    description: obj.description,
    publishYear: obj.publishYear,
    authorId: obj.authorId.toString(),
    categories: obj.categories.map((c: Types.ObjectId) => c.toString()),    
    isDeleted: obj.isDeleted
  };
}

export class BookRepo implements IBookRepo {
  async create(book: Book): Promise<Book> {
  const doc = await BookModel.create({
    title: book.title,
    description: book.description,
    publishYear: book.publishYear,
    authorId: new Types.ObjectId(book.authorId),      
    categories: book.categories.map(c => new Types.ObjectId(c)),
    isDeleted: book.isDeleted
  });

  return mapBookDocumentToBook(doc);
}

  async findById(id: string): Promise<Book | null> {
    const doc = await BookModel.findById(id).where({ isDeleted: false });
    return doc ? mapBookDocumentToBook(doc) : null;
  }

  async findAll(): Promise<Book[]> {
    const docs = await BookModel.find({ isDeleted: false });
    return docs.map(mapBookDocumentToBook);
  }

  async findByAuthor(authorId: string): Promise<Book[]> {
    const docs = await BookModel.find({ authorId, isDeleted: false });
    return docs.map(mapBookDocumentToBook);
  }

  async update(id: string, update: Partial<Book>): Promise<Book | null> {
    const doc = await BookModel.findByIdAndUpdate(id, update, { new: true });
    return doc ? mapBookDocumentToBook(doc) : null;
  }

  async softDelete(id: string): Promise<void> {
    await BookModel.findByIdAndUpdate(id, { isDeleted: true });
  }
}