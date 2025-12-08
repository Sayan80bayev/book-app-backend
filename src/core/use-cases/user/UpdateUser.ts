import type { IUserRepo } from "@/core/ports/IUserRepo.js";
import type { User } from "@/core/domain/user.js";

export class UpdateUser {
  constructor(private authorRepo: IUserRepo) {}

  async execute(id: string, update: Partial<User>): Promise<User | null> {
    return this.authorRepo.update(id, update);
  }
}