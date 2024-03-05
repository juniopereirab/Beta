import { Schema, model, Document } from 'mongoose'
import Joi from 'joi'

export const ProductSchemaValidate = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    discountPercentage: Joi.number().required(),
    rating: Joi.number().required(),
    stock: Joi.number().required(),
    brand: Joi.string().required(),
    category: Joi.string().required(),
    thumbnail: Joi.string().required(),
})

export interface IProduct {
    title: string,
    description: string,
    price: number,
    discountPercentage: number,
    rating: number,
    stock: number,
    brand: string,
    category: string,
    thumbnail: string,
}

export interface IProductDoc extends IProduct, Document {}

const ProductSchema = new Schema<IProductDoc>({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discountPercentage: {
        type: Number,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    brand: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true
    }
})

export const Product = model<IProductDoc>('Product', ProductSchema)