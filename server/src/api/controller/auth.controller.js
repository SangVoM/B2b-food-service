import {jsonSuccess} from '../../utils/result'
import {STATUS_CODE} from '../../constant/statusCode'
import { Users } from '../models/users.model';

export const signUpController = async (req, res) => {
  const result = req.user
  return res.status(STATUS_CODE.SUCCESS).json(jsonSuccess(result))
}

export const listUserController = async (req, res) => {
  const listUser = await Users.find()
  return res.status(STATUS_CODE.SUCCESS).json(jsonSuccess(listUser))
}
