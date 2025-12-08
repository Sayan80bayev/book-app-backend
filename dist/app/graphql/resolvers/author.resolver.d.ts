import type { CreateAuthor } from "../../../core/use-cases/author/CreateAuthor.js";
import type { GetAuthor } from "../../../core/use-cases/author/GetAuthor.js";
import type { UpdateAuthor } from "../../../core/use-cases/author/UpdateAuthor.js";
import type { DeleteAuthor } from "../../../core/use-cases/author/DeleteAuthor.js";
export declare const authorResolvers: {
    Query: {
        author: (_: any, { id }: {
            id: string;
        }, { getAuthor }: {
            getAuthor: GetAuthor;
        }) => Promise<import("../../../core/domain/author.js").Author>;
        authors: (_: any, __: any, { getAuthor }: {
            getAuthor: GetAuthor;
        }) => Promise<import("../../../core/domain/author.js").Author[]>;
    };
    Mutation: {
        createAuthor: (_: any, { input }: any, { createAuthor }: {
            createAuthor: CreateAuthor;
        }) => Promise<import("../../../core/domain/author.js").Author>;
        updateAuthor: (_: any, { id, input }: any, { updateAuthor }: {
            updateAuthor: UpdateAuthor;
        }) => Promise<import("../../../core/domain/author.js").Author>;
        deleteAuthor: (_: any, { id }: {
            id: string;
        }, { deleteAuthor }: {
            deleteAuthor: DeleteAuthor;
        }) => Promise<boolean>;
    };
};
//# sourceMappingURL=author.resolver.d.ts.map