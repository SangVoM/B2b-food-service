import { jsonSuccess } from '../../utils/result'
import { STATUS_CODE } from '../../constant/statusCode'
import { OrderDetail } from '../models/orderDetail.model'
import { Order, status } from '../models/order.model'
import { pagination } from '../../utils/common';

export const addToCard = async (req, res) => {
    const { user_id, body } = req
    /** Create order */
    const data = {
        profile: body.profile,
        user: user_id
    }
    const resultOrder = await Order.create(data)
    /** Create oder detail */
    if (resultOrder._id) {
        body.order.map(async item => {
            const data =  {
                product: item.productId,
                order: resultOrder._id,
                user: user_id,
                quantity: item.quantity,
                price: item.price
            }
            await OrderDetail.create(data)
        })

    }
    return res.status(STATUS_CODE.SUCCESS).json(jsonSuccess(true))
}

export const cancelOrder = async (req, res) => {
    const { order_id } = req.body
    const { user_id } = req.headers
    await Order.findByIdAndUpdate(order_id, { status: status.REJECTED })
    await OrderDetail.updateMany({ order: order_id, user: user_id, delete: false }, {
        delete: true
    })
    return res.status(STATUS_CODE.SUCCESS).json(jsonSuccess(true))
}

export const orderOfUser = async (req, res) => {
    let { limit, page } = req.query;
    const { user_id } = req
    let page_options = pagination({ limit, page });
    const result = await Order.aggregate()
        .match({ user: user_id })
        .lookup({
            from: 'orderdetails',
            let: { order_id: '$_id' },
            pipeline: [
                { $match: { $expr: { $eq: ['$order', '$$order_id'] } } },
                { $lookup: { from: 'products', localField: 'product', foreignField: '_id', as: 'product' } },
                { $unwind: '$product' },
                { $project: { quantity: 1, price: 1, user: 1, 'product_name': '$product.name' } },
            ],
            as: 'orderDetail'
        })
        .skip(page_options.page * page_options.limit)
        .limit(page_options.limit)
    return res.status(STATUS_CODE.SUCCESS).json(jsonSuccess(result))
}
