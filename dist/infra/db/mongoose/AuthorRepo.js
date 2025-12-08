import { AuthorModel } from "./AuthorModel.js";
function mapAuthorDocumentToAuthor(doc) {
    const obj = doc.toObject();
    return {
        id: obj._id.toString(),
        name: obj.name,
        bio: obj.bio,
        birthDate: obj.birthDate,
        nationality: obj.nationality,
        isDeleted: obj.isDeleted
    };
}
export class AuthorRepo {
    async create(author) {
        const { id, ...rest } = author;
        const doc = await AuthorModel.create({
            ...rest,
        });
        return mapAuthorDocumentToAuthor(doc);
    }
    async findById(id) {
        const doc = await AuthorModel.findById(id).where({ isDeleted: false });
        return doc ? mapAuthorDocumentToAuthor(doc) : null;
    }
    async findAll() {
        const docs = await AuthorModel.find({ isDeleted: false });
        return docs.map(mapAuthorDocumentToAuthor);
    }
    async update(id, update) {
        const doc = await AuthorModel.findByIdAndUpdate(id, update, { new: true });
        return doc ? mapAuthorDocumentToAuthor(doc) : null;
    }
    async softDelete(id) {
        await AuthorModel.findByIdAndUpdate(id, { isDeleted: true });
    }
}
//# sourceMappingURL=AuthorRepo.js.map