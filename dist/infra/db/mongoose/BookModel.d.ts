import { Document, Types } from "mongoose";
export interface BookDocument extends Document {
    title: string;
    description: string;
    publishYear: number;
    authorId: Types.ObjectId;
    categories: Types.ObjectId[];
    isDeleted: boolean;
}
export declare const BookModel: import("mongoose").Model<BookDocument, {}, {}, {}, Document<unknown, {}, BookDocument, {}, import("mongoose").DefaultSchemaOptions> & BookDocument & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any, BookDocument>;
//# sourceMappingURL=BookModel.d.ts.map