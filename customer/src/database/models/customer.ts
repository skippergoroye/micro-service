import mongoose, {Schema } from "mongoose";

export interface ICustomer {
    email: string,
    password: string,
    salt: string,
    phone: string,
    cart: Array<object>
}

const CustomerSchema = new Schema({
    email: String,
    password: String,
    salt: String,
    phone: String,
    cart: [
        {
            product: {
                _id: { type:String, require: true },
                name: {type:String},
                bannner: {type:String},
                price:{type:Number},
            },
            unit: {type:Number, require: true}
        }
    ]
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

export const CustomerModel = mongoose.model<ICustomer>('customer', CustomerSchema)
