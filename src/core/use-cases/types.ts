import type { User } from "@/core/domain/user.js";

export interface RegisterUserResult {
  user: Omit<User, "password">;
  token: string;
}

export interface LoginUserResult {
  user: Omit<User, "password">;
  token: string;
}