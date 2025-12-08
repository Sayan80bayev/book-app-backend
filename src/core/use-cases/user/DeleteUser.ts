import type { IUserRepo } from "@/core/ports/IUserRepo.js";

export class DeleteUser {
  constructor(private authorRepo: IUserRepo) {}

  async execute(id: string): Promise<void> {
    await this.authorRepo.softDelete(id);
  }
}