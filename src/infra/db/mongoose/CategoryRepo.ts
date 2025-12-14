import type { ICategoryRepo } from "@/core/ports/ICategoryRepo.js";
import type { Category } from "@/core/domain/category.js";
import { CategoryModel } from "@/infra/db/mongoose/CategoryModel.js";

function mapDocToCategory(doc: any): Category {
  const obj = doc.toObject();
  return {
    id: obj._id.toString(),
    title: obj.title,
    description: obj.description,
    icon: obj.icon,
    parentCategoryId: obj.parentCategoryId?.toString() ?? null,
    isDeleted: obj.isDeleted
  };
}

export class CategoryRepo implements ICategoryRepo {
  async create(category: Category): Promise<Category> {
    const doc = await CategoryModel.create(category);
    return mapDocToCategory(doc);
  }

  async findById(id: string): Promise<Category | null> {
    const doc = await CategoryModel.findById(id).where({ isDeleted: false });
    return doc ? mapDocToCategory(doc) : null;
  }

  async findAll(): Promise<Category[]> {
    const docs = await CategoryModel.find({ isDeleted: false });
    return docs.map(mapDocToCategory);
  }

  async update(id: string, update: Partial<Category>): Promise<Category | null> {
    const doc = await CategoryModel.findByIdAndUpdate(id, update, { new: true });
    return doc ? mapDocToCategory(doc) : null;
  }

  async softDelete(id: string): Promise<void> {
    await CategoryModel.findByIdAndUpdate(id, { isDeleted: true });
  }
}