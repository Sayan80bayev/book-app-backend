export class CreateAuthor {
    authorRepo;
    constructor(authorRepo) {
        this.authorRepo = authorRepo;
    }
    async execute(author) {
        return this.authorRepo.create(author);
    }
}
//# sourceMappingURL=CreateAuthor.js.map