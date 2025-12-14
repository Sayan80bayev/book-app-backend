import type { Category } from "@/core/domain/category.js";

export interface ICategoryRepo {
  create(category: Category): Promise<Category>;
  findById(id: string): Promise<Category | null>;
  findAll(): Promise<Category[]>;
  update(id: string, update: Partial<Category>): Promise<Category | null>;
  softDelete(id: string): Promise<void>;
}