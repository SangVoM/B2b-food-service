import { Users } from '../models/users.model';
import {STATUS_CODE} from "../../constant/statusCode";
import {jsonError} from "../../utils/result";
import {MESSAGE_ERROR} from "../../constant/errors";

export const auth = async (req, res, next) => {
    const { user_name } = req.body;
    console.log('user_name: ', user_name)
    const existUser = await Users.findOne({ email: user_name })
    if (!existUser) return res.status(STATUS_CODE.FORBIDDEN).json(jsonError(MESSAGE_ERROR.USER_NOT_FOUND))
    req.user = existUser
    next()
}

export const authUserId = async (req, res, next) => {
    const { user_id } = req.headers
    const existUser = await Users.findOne({ _id: user_id })
    if (!existUser) return res.status(STATUS_CODE.FORBIDDEN).json(jsonError(MESSAGE_ERROR.USER_NOT_FOUND))
    req.user_id = existUser._id
    next()
}
