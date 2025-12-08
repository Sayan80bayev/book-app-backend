export class UpdateAuthor {
    authorRepo;
    constructor(authorRepo) {
        this.authorRepo = authorRepo;
    }
    async execute(id, update) {
        return this.authorRepo.update(id, update);
    }
}
//# sourceMappingURL=UpdateAuthor.js.map