import type { IBookRepo } from "@/core/ports/IBookRepo.js";

export class DeleteBook {
  constructor(private bookRepo: IBookRepo) {}

  async execute(id: string): Promise<void> {
    await this.bookRepo.softDelete(id);
  }
}