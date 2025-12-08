import type { RegisterUser } from "@/core/use-cases/user/RegisterUser.js";
import type { LoginUser } from "@/core/use-cases/user/LoginUser.js";
import type { GetUser } from "@/core/use-cases/user/GetUser.js";
import type { UpdateUser } from "@/core/use-cases/user/UpdateUser.js";
import { DeleteUser } from "@/core/use-cases/user/DeleteUser.js";
import { GraphQLError } from "graphql";

export const userResolvers = {
  Query: {
    user: async (
      _: any,
      { id }: { id: string },
      { getUser }: { getUser: GetUser }
    ) => {
      const user = await getUser.execute(id);
      if (!user) throw new GraphQLError("User not found", { extensions: { code: "NOT_FOUND" } });
      return user;
    },
    users: async (_: any, __: any, { getUser }: { getUser: GetUser }) => {
      return getUser.executeAll();
    }
  },

  Mutation: {
    registerUser: async (
      _: any,
      { input }: any,
      { registerUser }: { registerUser: RegisterUser }
    ) => {
      return registerUser.execute({ ...input, isDeleted: false, id: "" });
    },

    loginUser: async (
      _: any,
      { input }: { input: { username: string; password: string } },
      { loginUser }: { loginUser: LoginUser }
    ) => {
      const { username, password } = input;
      return loginUser.execute(username, password);
    },

    updateUser: async (
      _: any,
      { id, input }: any,
      { updateUser, contextUserId }: { updateUser: UpdateUser; contextUserId: string }
    ) => {
      if (id !== contextUserId) {
        throw new GraphQLError("Not authorized", { extensions: { code: "FORBIDDEN" } });
      }
      const user = await updateUser.execute(id, input);
      if (!user) throw new GraphQLError("User not found", { extensions: { code: "NOT_FOUND" } });
      return user;
    },

    deleteUser: async (
      _: any,
      { id }: { id: string },
      { deleteUser, contextUserId }: { deleteUser: DeleteUser; contextUserId: string }
    ) => {
      if (id !== contextUserId) {
        throw new GraphQLError("Not authorized", { extensions: { code: "FORBIDDEN" } });
      }
      await deleteUser.execute(id);
      return true;
    }
  }
};