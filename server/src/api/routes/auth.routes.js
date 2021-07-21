import { Router } from 'express'
import { signUpController, listUserController } from '../controller/auth.controller'
import { auth } from '../middlewares/auth.middleware';
import validateSchema from '../controller/validation/index';
import inputValidateMiddleWare from '../middlewares/inputValidate.middleware';

const authRouter = Router()
authRouter.post('/sign-in', inputValidateMiddleWare(validateSchema.signIn), auth, signUpController)
authRouter.get('/list-user', listUserController)
export default authRouter
