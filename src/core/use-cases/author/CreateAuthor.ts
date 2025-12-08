import type { IAuthorRepo } from "@/core/ports/IAuthorRepo.js";
import type { Author } from "@/core/domain/author.js";

export class CreateAuthor {
  constructor(private authorRepo: IAuthorRepo) {}

  async execute(author: Author): Promise<Author> {
    return this.authorRepo.create(author);
  }
}