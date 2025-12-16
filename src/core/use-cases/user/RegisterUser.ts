import type { IUserRepo } from "@/core/ports/IUserRepo.js";
import type { User } from "@/core/domain/user.js";
import type { RegisterUserResult } from "@/core/use-cases/types.js";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@/config.js";

export class RegisterUser {
  constructor(private userRepo: IUserRepo) {}

  async execute(input: User): Promise<RegisterUserResult> {
    
    const hashedPassword = await bcrypt.hash(input.password, 10);


    const userToCreate: User = {
      ...input,
      password: hashedPassword
    };

    const createdUser = await this.userRepo.create(userToCreate);

    const token = jwt.sign({ id: createdUser.id }, JWT_SECRET, { expiresIn: "7d" });

    return {
      user: {
        id: createdUser.id,
        username: createdUser.username,
        bio: createdUser.bio,
        birthDate: createdUser.birthDate,
        nationality: createdUser.nationality,
        isDeleted: createdUser.isDeleted
      },
      token
    };
  }
}