import * as mongoose from 'mongoose'
import { generateOrderCode } from '../../utils/common'

export const OrderModelName = 'Order'

const status = {
    PENDING: 'PENDING',
    DONE: 'DONE',
    REJECTED: 'REJECTED'
};

const OrderSchema = new mongoose.Schema({
        profile: {
            name: { type: String, default: '' },
            email: { type: String, default: '' },
            address: { type: String, default: '' },
            phoneNumber: { type: String, default: '' },
            note: { type: String, default: '' }
        },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
        order_code: { type: String, default: generateOrderCode(6) },
        status: {
            type: String,
            enum: Object.values(status),
            default: status.PENDING
        },
        reason: {
            type: String,
            default: ''
        },
        delete: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true })

const Order = mongoose.model(OrderModelName, OrderSchema)
export { status, Order }
