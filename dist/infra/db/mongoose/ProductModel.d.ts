import { Document, Types } from "mongoose";
export interface ProductDocument extends Document {
    name: string;
    description: string;
    price: number;
    stock: number;
    categoryId: Types.ObjectId;
    isDeleted: boolean;
}
export declare const ProductModel: import("mongoose").Model<ProductDocument, {}, {}, {}, Document<unknown, {}, ProductDocument, {}, import("mongoose").DefaultSchemaOptions> & ProductDocument & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any, ProductDocument>;
//# sourceMappingURL=ProductModel.d.ts.map