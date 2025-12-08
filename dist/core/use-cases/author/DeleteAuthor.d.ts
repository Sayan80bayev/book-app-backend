import type { IAuthorRepo } from "../../ports/IAuthorRepo.js";
export declare class DeleteAuthor {
    private authorRepo;
    constructor(authorRepo: IAuthorRepo);
    execute(id: string): Promise<void>;
}
//# sourceMappingURL=DeleteAuthor.d.ts.map