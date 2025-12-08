import type { CreateAuthor } from "@/core/use-cases/author/CreateAuthor.js";
import type { GetAuthor } from "@/core/use-cases/author/GetAuthor.js";
import type { UpdateAuthor } from "@/core/use-cases/author/UpdateAuthor.js";
import type { DeleteAuthor } from "@/core/use-cases/author/DeleteAuthor.js";
import { GraphQLError } from "graphql";

export const authorResolvers = {
  Query: {
    author: async (_: any, { id }: { id: string }, { getAuthor }: { getAuthor: GetAuthor }) => {
      const author = await getAuthor.execute(id);
      if (!author) throw new GraphQLError("Author not found", { extensions: { code: "NOT_FOUND" } });
      return author;
    },
    authors: async (_: any, __: any, { getAuthor }: { getAuthor: GetAuthor }) => {
      return getAuthor.executeAll();
    }
  },

  Mutation: {
    createAuthor: async (_: any, { input }: any, { createAuthor }: { createAuthor: CreateAuthor }) => {
      return createAuthor.execute({ ...input, isDeleted: false, id: "" });
    },

    updateAuthor: async (_: any, { id, input }: any, { updateAuthor }: { updateAuthor: UpdateAuthor }) => {
      const author = await updateAuthor.execute(id, input);
      if (!author) throw new GraphQLError("Author not found", { extensions: { code: "NOT_FOUND" } });
      return author;
    },

    deleteAuthor: async (_: any, { id }: { id: string }, { deleteAuthor }: { deleteAuthor: DeleteAuthor }) => {
      await deleteAuthor.execute(id);
      return true;
    }
  }
};