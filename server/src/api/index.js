import express from 'express'
import authRouter from './routes/auth.routes'
import productCategoryRouter from './routes/productCategory.routes'
import orderRouter from './routes/order.routes'
const api = express()

api.use('/auth', authRouter)
api.use('/product-category', productCategoryRouter)
api.use('/order', orderRouter)
export default api
