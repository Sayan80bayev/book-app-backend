import { GraphQLError } from "graphql";
export const authorResolvers = {
    Query: {
        author: async (_, { id }, { getAuthor }) => {
            const author = await getAuthor.execute(id);
            if (!author)
                throw new GraphQLError("Author not found", { extensions: { code: "NOT_FOUND" } });
            return author;
        },
        authors: async (_, __, { getAuthor }) => {
            return getAuthor.executeAll();
        }
    },
    Mutation: {
        createAuthor: async (_, { input }, { createAuthor }) => {
            return createAuthor.execute({ ...input, isDeleted: false, id: "" });
        },
        updateAuthor: async (_, { id, input }, { updateAuthor }) => {
            const author = await updateAuthor.execute(id, input);
            if (!author)
                throw new GraphQLError("Author not found", { extensions: { code: "NOT_FOUND" } });
            return author;
        },
        deleteAuthor: async (_, { id }, { deleteAuthor }) => {
            await deleteAuthor.execute(id);
            return true;
        }
    }
};
//# sourceMappingURL=author.resolver.js.map