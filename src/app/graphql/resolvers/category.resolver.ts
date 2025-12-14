import { GraphQLError } from "graphql";

import type { CreateCategory } from "@/core/use-cases/category/CreateCategory.js";
import type { GetCategory } from "@/core/use-cases/category/GetCategory.js";
import type { DeleteCategory } from "@/core/use-cases/category/DeleteCategory.js";

export const categoryResolvers = {
  Query: {
    categories: async (
      _: any,
      __: any,
      { getCategory }: { getCategory: GetCategory }
    ) => {
      return getCategory.executeAll();
    },

    category: async (
      _: any,
      { id }: { id: string },
      { getCategory }: { getCategory: GetCategory }
    ) => {
      const category = await getCategory.execute(id);
      if (!category) {
        throw new GraphQLError("Category not found", {
          extensions: { code: "NOT_FOUND" }
        });
      }
      return category;
    }
  },

  Mutation: {
    createCategory: async (
      _: any,
      { input }: any,
      { createCategory }: { createCategory: CreateCategory }
    ) => {
      return createCategory.execute({
        ...input,
        id: "",
        isDeleted: false
      });
    },

    deleteCategory: async (
      _: any,
      { id }: { id: string },
      { deleteCategory }: { deleteCategory: DeleteCategory }
    ) => {
      await deleteCategory.execute(id);
      return true;
    }
  }
};