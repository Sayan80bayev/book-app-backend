import type { IAuthorRepo } from "@/core/ports/IAuthorRepo.js";
import type { Author } from "@/core/domain/author.js";

export class UpdateAuthor {
  constructor(private authorRepo: IAuthorRepo) {}

  async execute(id: string, update: Partial<Author>): Promise<Author | null> {
    return this.authorRepo.update(id, update);
  }
}