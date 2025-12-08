import type { IAuthorRepo } from "../../ports/IAuthorRepo.js";
import type { Author } from "../../domain/author.js";
export declare class CreateAuthor {
    private authorRepo;
    constructor(authorRepo: IAuthorRepo);
    execute(author: Author): Promise<Author>;
}
//# sourceMappingURL=CreateAuthor.d.ts.map