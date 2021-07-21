import { Order, status } from '../models/order.model';
import {STATUS_CODE} from "../../constant/statusCode";
import {jsonError} from "../../utils/result";
import {MESSAGE_ERROR} from "../../constant/errors";

export const orderIdExist = async (req, res, next) => {
    const { order_id } = req.body;
    const { user_id } = req.headers;
    const existOrder = await Order.findOne({ _id: order_id, status: status.PENDING, user: user_id })
    if (!existOrder) return res.status(STATUS_CODE.FORBIDDEN).json(jsonError(MESSAGE_ERROR.ORDER_NOT_FOUND))
    next()
}
