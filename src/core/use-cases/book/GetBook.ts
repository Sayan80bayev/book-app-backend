import type { IBookRepo } from "@/core/ports/IBookRepo.js";
import type { Book } from "@/core/domain/book.js";

export class GetBook {
  constructor(private bookRepo: IBookRepo) {}

  async execute(id: string): Promise<Book | null> {
    return this.bookRepo.findById(id);
  }

  async executeAll(): Promise<Book[]> {
    return this.bookRepo.findAll();
  }

  async byAuthor(authorId: string): Promise<Book[]> {
    return this.bookRepo.findByAuthor(authorId);
  }
}