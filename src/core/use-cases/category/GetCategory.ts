import type { ICategoryRepo } from "@/core/ports/ICategoryRepo.js";
import type { Category } from "@/core/domain/category.js";

export class GetCategory {
  constructor(private categoryRepo: ICategoryRepo) {}

  async execute(id: string): Promise<Category | null> {
    return this.categoryRepo.findById(id);
  }

  async executeAll(): Promise<Category[]> {
    return this.categoryRepo.findAll();
  }
}