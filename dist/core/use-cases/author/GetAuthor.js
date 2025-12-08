export class GetAuthor {
    authorRepo;
    constructor(authorRepo) {
        this.authorRepo = authorRepo;
    }
    async execute(id) {
        return this.authorRepo.findById(id);
    }
    async executeAll() {
        return this.authorRepo.findAll();
    }
}
//# sourceMappingURL=GetAuthor.js.map