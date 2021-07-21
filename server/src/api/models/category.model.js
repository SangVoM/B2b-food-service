import * as mongoose from 'mongoose'

export const CategoryModelName = 'Category'

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    code_category: {
        type: String,
        required: true,
    }
},{ timestamps: true })

export const Category = mongoose.model(CategoryModelName, CategorySchema)
