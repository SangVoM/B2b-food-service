import { Router } from 'express';
import { addToCard, cancelOrder, orderOfUser } from '../controller/order.controller';
import inputValidateMiddleWare from '../middlewares/inputValidate.middleware';
import validateSchema from '../controller/validation/index';
import { authUserId } from '../middlewares/auth.middleware';
import { orderIdExist } from '../middlewares/order.middleware';

const orderRouter = Router()
orderRouter.post('/add-to-card', authUserId, inputValidateMiddleWare(validateSchema.order), addToCard)
orderRouter.put('/cancel-order', authUserId, orderIdExist, inputValidateMiddleWare(validateSchema.cancelOrder), cancelOrder)
orderRouter.get('/get-order-of-user', authUserId, orderOfUser)
export default orderRouter
