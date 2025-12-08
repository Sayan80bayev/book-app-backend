import { BookModel } from "./BookModel.js";
import { Types } from "mongoose";
function mapBookDocumentToBook(doc) {
    const obj = doc.toObject();
    return {
        id: obj._id.toString(),
        title: obj.title,
        description: obj.description,
        publishYear: obj.publishYear,
        authorId: obj.authorId.toString(),
        categories: obj.categories.map((c) => c.toString()),
        isDeleted: obj.isDeleted
    };
}
export class BookRepo {
    async create(book) {
        const doc = await BookModel.create({
            title: book.title,
            description: book.description,
            publishYear: book.publishYear,
            authorId: new Types.ObjectId(book.authorId),
            categories: book.categories.map(c => new Types.ObjectId(c)),
            isDeleted: book.isDeleted
        });
        return mapBookDocumentToBook(doc);
    }
    async findById(id) {
        const doc = await BookModel.findById(id).where({ isDeleted: false });
        return doc ? mapBookDocumentToBook(doc) : null;
    }
    async findAll() {
        const docs = await BookModel.find({ isDeleted: false });
        return docs.map(mapBookDocumentToBook);
    }
    async findByAuthor(authorId) {
        const docs = await BookModel.find({ authorId, isDeleted: false });
        return docs.map(mapBookDocumentToBook);
    }
    async update(id, update) {
        const doc = await BookModel.findByIdAndUpdate(id, update, { new: true });
        return doc ? mapBookDocumentToBook(doc) : null;
    }
    async softDelete(id) {
        await BookModel.findByIdAndUpdate(id, { isDeleted: true });
    }
}
//# sourceMappingURL=BookRepo.js.map