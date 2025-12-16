import type { IUserRepo } from "@/core/ports/IUserRepo.js";
import type { LoginUserResult } from "@/core/use-cases/types.js";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@/config.js";

export class LoginUser {
  constructor(private userRepo: IUserRepo) {}

  async execute(username: string, password: string): Promise<LoginUserResult> {
    const user = await this.userRepo.findByUsername(username);
    if (!user) {
      throw new Error("Invalid username or password");
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error("Invalid username or password");
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "7d" });

    return {
      user: {
        id: user.id,
        username: user.username,
        bio: user.bio,
        birthDate: user.birthDate,
        nationality: user.nationality,
        isDeleted: user.isDeleted
      },
      token
    };
  }
}