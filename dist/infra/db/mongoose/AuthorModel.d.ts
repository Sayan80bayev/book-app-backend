import { Document } from "mongoose";
export interface AuthorDocument extends Document {
    name: string;
    bio: string;
    birthDate: Date;
    nationality: string;
    isDeleted: boolean;
}
export declare const AuthorModel: import("mongoose").Model<AuthorDocument, {}, {}, {}, Document<unknown, {}, AuthorDocument, {}, import("mongoose").DefaultSchemaOptions> & AuthorDocument & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, any, AuthorDocument>;
//# sourceMappingURL=AuthorModel.d.ts.map