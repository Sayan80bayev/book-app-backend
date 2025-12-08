import type { IAuthorRepo } from "../../../core/ports/IAuthorRepo.js";
import type { Author } from "../../../core/domain/author.js";
export declare class AuthorRepo implements IAuthorRepo {
    create(author: Author): Promise<Author>;
    findById(id: string): Promise<Author | null>;
    findAll(): Promise<Author[]>;
    update(id: string, update: Partial<Author>): Promise<Author | null>;
    softDelete(id: string): Promise<void>;
}
//# sourceMappingURL=AuthorRepo.d.ts.map