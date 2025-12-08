import type { IAuthorRepo } from "@/core/ports/IAuthorRepo.js";

export class DeleteAuthor {
  constructor(private authorRepo: IAuthorRepo) {}

  async execute(id: string): Promise<void> {
    await this.authorRepo.softDelete(id);
  }
}