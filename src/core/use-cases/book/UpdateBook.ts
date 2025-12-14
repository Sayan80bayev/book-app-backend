import type { IBookRepo } from "@/core/ports/IBookRepo.js";
import type { Book } from "@/core/domain/book.js";

export class UpdateBook {
  constructor(private bookRepo: IBookRepo) {}

  async execute(
    id: string,
    update: Partial<Book>
  ): Promise<Book | null> {

    if (update.publishYear && update.publishYear < 1000) {
      throw new Error("Invalid publish year");
    }

    return this.bookRepo.update(id, update);
  }
}