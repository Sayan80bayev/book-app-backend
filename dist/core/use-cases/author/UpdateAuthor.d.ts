import type { IAuthorRepo } from "../../ports/IAuthorRepo.js";
import type { Author } from "../../domain/author.js";
export declare class UpdateAuthor {
    private authorRepo;
    constructor(authorRepo: IAuthorRepo);
    execute(id: string, update: Partial<Author>): Promise<Author | null>;
}
//# sourceMappingURL=UpdateAuthor.d.ts.map