import type { ICategoryRepo } from "@/core/ports/ICategoryRepo.js";

export class DeleteCategory {
  constructor(private categoryRepo: ICategoryRepo) {}

  async execute(id: string): Promise<void> {
    await this.categoryRepo.softDelete(id);
  }
}