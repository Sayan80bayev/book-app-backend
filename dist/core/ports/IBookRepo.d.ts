import type { Book } from "../domain/book.js";
export interface IBookRepo {
    create(book: Book): Promise<Book>;
    findById(id: string): Promise<Book | null>;
    findAll(): Promise<Book[]>;
    findByAuthor(authorId: string): Promise<Book[]>;
    update(id: string, update: Partial<Book>): Promise<Book | null>;
    softDelete(id: string): Promise<void>;
}
//# sourceMappingURL=IBookRepo.d.ts.map