import { Document, Types } from "mongoose";
export interface CategoryDocument extends Document {
    title: string;
    description: string;
    icon: string;
    parentCategoryId?: Types.ObjectId | null;
    isDeleted: boolean;
}
export declare const CategoryModel: import("mongoose").Model<CategoryDocument, {}, {}, {}, Document<unknown, {}, CategoryDocument, {}, import("mongoose").DefaultSchemaOptions> & CategoryDocument & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any, CategoryDocument>;
//# sourceMappingURL=CategoryModel.d.ts.map