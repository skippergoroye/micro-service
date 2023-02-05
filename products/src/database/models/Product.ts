import mongoose, { Schema } from "mongoose";

export interface IProduct {
    name: string;
    desc: string;
    banner: string;
    type: string;
    unit: number;
    price: number;
    avaliable:boolean;
    suplier:string;
}


const ProductSchema = new Schema({
    name: String,
    desc: String,
    banner: String,
    type: String,
    unit: Number,
    price: Number,
    avaliable:Boolean,
    suplier:String,
},
{
    toJSON: {
        transform(doc, ret){
            delete ret.password
            delete ret.salt
        }
    },
    timestamps: true
})


export const ProductModel = mongoose.model<IProduct>('product', ProductSchema)
