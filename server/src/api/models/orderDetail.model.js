import * as mongoose from 'mongoose'

export const OrderDetailModelName = 'OrderDetail'

function limit(val) {
    return val > 0;
}

const OrderDetailSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
    quantity: { type: Number, validate: [limit, '{PATH} must be greater than zero'] },
    price: { type: String, default: 0 },
    delete: {
        type: Boolean,
        default: false
    }
},
{ timestamps: true }
)

export const OrderDetail = mongoose.model(OrderDetailModelName, OrderDetailSchema)
