import type { ICategoryRepo } from "@/core/ports/ICategoryRepo.js";
import type { Category } from "@/core/domain/category.js";

export class CreateCategory {
  constructor(private categoryRepo: ICategoryRepo) {}

  async execute(input: Category): Promise<Category> {
    return this.categoryRepo.create(input);
  }
}