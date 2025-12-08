import type { IUserRepo } from "@/core/ports/IUserRepo.js";
import type { User } from "@/core/domain/user.js";

export class GetUser {
  constructor(private authorRepo: IUserRepo) {}

  async execute(id: string): Promise<User | null> {
    return this.authorRepo.findById(id);
  }

  async executeAll(): Promise<User[]> {
    return this.authorRepo.findAll();
  }
}
