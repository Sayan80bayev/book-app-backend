import type { Author } from "@/core/domain/author.js";

export interface IAuthorRepo {
  create(author: Author): Promise<Author>;
  findById(id: string): Promise<Author | null>;
  findAll(): Promise<Author[]>;
  update(id: string, update: Partial<Author>): Promise<Author | null>;
  softDelete(id: string): Promise<void>;
}