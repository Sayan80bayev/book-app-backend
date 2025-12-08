export class DeleteAuthor {
    authorRepo;
    constructor(authorRepo) {
        this.authorRepo = authorRepo;
    }
    async execute(id) {
        await this.authorRepo.softDelete(id);
    }
}
//# sourceMappingURL=DeleteAuthor.js.map