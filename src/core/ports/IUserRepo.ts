import type { User } from "@/core/domain/user.js";

export interface IUserRepo {
  create(user: User): Promise<User>;
  findById(id: string): Promise<User | null>;
  findByUsername(username: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  update(id: string, update: Partial<User>): Promise<User | null>;
  softDelete(id: string): Promise<void>;
}