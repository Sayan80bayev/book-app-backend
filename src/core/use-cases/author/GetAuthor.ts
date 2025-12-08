import type { IAuthorRepo } from "@/core/ports/IAuthorRepo.js";
import type { Author } from "@/core/domain/author.js";

export class GetAuthor {
  constructor(private authorRepo: IAuthorRepo) {}

  async execute(id: string): Promise<Author | null> {
    return this.authorRepo.findById(id);
  }

  async executeAll(): Promise<Author[]> {
    return this.authorRepo.findAll();
  }
}
