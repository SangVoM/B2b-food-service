import * as mongoose from 'mongoose'

export const ProductModelName = 'Product'

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        default: null
    },
    content: { type: String, default: '' },
    price: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    id_category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    quantity: { type: Number, default: 0 },
    image: {
        type: String,
        default: null
    },
    code_category: {
        type: Number,
        default: null
    }
},
{ timestamps: true }
)

export const Products = mongoose.model(ProductModelName, ProductSchema)
