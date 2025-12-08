import type { IAuthorRepo } from "../../ports/IAuthorRepo.js";
import type { Author } from "../../domain/author.js";
export declare class GetAuthor {
    private authorRepo;
    constructor(authorRepo: IAuthorRepo);
    execute(id: string): Promise<Author | null>;
    executeAll(): Promise<Author[]>;
}
//# sourceMappingURL=GetAuthor.d.ts.map