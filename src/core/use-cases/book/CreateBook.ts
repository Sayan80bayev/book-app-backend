import type { IBookRepo } from "@/core/ports/IBookRepo.js";
import type { Book } from "@/core/domain/book.js";

export class CreateBook {
  constructor(private bookRepo: IBookRepo) {}

  async execute(input: Book): Promise<Book> {
    if (input.publishYear < 1000) {
      throw new Error("Invalid publish year");
    }

    if (!input.title || input.title.length < 3) {
      throw new Error("Title is too short");
    }

    return this.bookRepo.create(input);
  }
}